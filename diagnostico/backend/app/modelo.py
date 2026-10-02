"""Fórmulas de valor del Diagnóstico AgriVision. Funciones puras, sin I/O.

Regla para datos del usuario: cuando la persona da su propio valor (por ejemplo
su % de pérdida por Botrytis), ese valor se toma como escenario medio y los
escenarios pesimista/optimista conservan la misma amplitud relativa que tienen
los promedios del sector (`_rango`). Cuando no lo da, se usan los escenarios del
sector tal cual. Así, la finca de referencia de 100 ha reproduce las cifras de
`precios-y-valor-agregado-100ha.md`.
"""

from . import supuestos as S
from .schemas import Respuestas


def _rango(valor_usuario, por_escenario):
    if valor_usuario is None:
        return dict(por_escenario)
    medio = por_escenario["medio"]
    return {e: valor_usuario * por_escenario[e] / medio for e in S.ESCENARIOS}


def _o(valor, defecto):
    return defecto if valor is None else valor


def contexto_finca(r: Respuestas) -> dict:
    ha = r.hectareas
    camas_ha = _o(r.camas_ha, S.CAMAS_POR_HA)
    canales = [r.pct_contrato, r.pct_abierto, r.pct_nacional]
    if any(c is None for c in canales) or sum(canales) <= 0:
        contrato, abierto, nacional = S.PCT_CONTRATO, S.PCT_ABIERTO, S.PCT_NACIONAL
    else:
        total = sum(canales)
        contrato, abierto, nacional = (c / total for c in canales)
    return {
        "hectareas": ha,
        "camas": ha * camas_ha,
        "ingreso_anual_usd": _o(r.ingreso_anual_usd, S.INGRESO_HA_USD * ha),
        "pct_contrato": contrato,
        "pct_abierto": abierto,
        "pct_nacional": nacional,
        "personas_ha": _o(r.personas_ha, S.PERSONAS_HA),
        "costo_trabajador_cop_mes": _o(r.costo_trabajador_cop_mes, S.COSTO_TRABAJADOR_COP_MES),
        "trm": _o(r.trm, S.TRM),
    }


def _palanca(id_, nombre, usd, ha):
    return {"id": id_, "nombre": nombre, "usd": usd, "usd_ha": usd / ha if ha else 0.0}


def _resumen(escenarios, costo_anual, ha):
    """Agrega totales, múltiplo y payback por escenario."""
    for esc in escenarios.values():
        total = sum(p["usd"] for p in esc["palancas"])
        esc["total_usd"] = total
        esc["total_usd_ha"] = total / ha if ha else 0.0
        esc["neto_usd"] = total - (costo_anual or 0)
        esc["multiplo"] = total / costo_anual if costo_anual else None
        esc["payback_meses"] = 12 * costo_anual / total if costo_anual and total > 0 else None
    return escenarios


def valor_botrytis(r: Respuestas, f: dict) -> dict:
    ha, ingreso = f["hectareas"], f["ingreso_anual_usd"]
    perdida = _rango(r.pct_perdida_botrytis, S.PCT_PERDIDA_BOTRYTIS)
    aplicaciones = _rango(r.aplicaciones_ano, S.APLICACIONES_ANO)
    litros = _o(r.fungicida_l_ha, S.FUNGICIDA_L_HA)
    usd_l = _o(r.fungicida_usd_l, S.FUNGICIDA_USD_L)

    escenarios = {}
    for e in S.ESCENARIOS:
        evitable = ingreso * perdida[e] * S.FRACCION_EVITABLE_BOTRYTIS
        fungicida = ha * litros * usd_l * aplicaciones[e] * S.REDUCCION_FUNGICIDA[e]
        escenarios[e] = {"palancas": [
            _palanca("tallos_baja", "Menos flor perdida en el cultivo", evitable * S.REPARTO_BOTRYTIS["tallos_baja"], ha),
            _palanca("rechazos", "Menos embarques rechazados", evitable * S.REPARTO_BOTRYTIS["rechazos"], ha),
            _palanca("reclamos", "Menos descuentos por reclamos", evitable * S.REPARTO_BOTRYTIS["reclamos"], ha),
            _palanca("fungicida", "Menos fungicida aplicado a ciegas", fungicida, ha),
        ]}

    informes = _o(r.informes_despacho_ano, S.INFORMES_DESPACHO_ANO)
    lotes = _o(r.lotes_sello_ano, S.LOTES_SELLO_ANO)
    costo = {
        "vigilancia": f["camas"] * S.PRECIO_BOTRYTIS_VIGILANCIA_CAMA_MES * 12,
        "informes": informes * S.PRECIO_BOTRYTIS_INFORME,
        "sellos": lotes * S.PRECIO_BOTRYTIS_SELLO,
    }
    costo_anual = sum(costo.values())
    return {
        "id": "botrytis",
        "nombre": "Botrytis",
        "descripcion": "Detecta el moho gris antes de que se vea a simple vista.",
        "costo_anual_usd": costo_anual,
        "costo_detalle": costo,
        "escenarios": _resumen(escenarios, costo_anual, ha),
    }


def valor_estimados(r: Respuestas, f: dict) -> dict:
    ha, ingreso = f["hectareas"], f["ingreso_anual_usd"]
    abierto, nacional = f["pct_abierto"], f["pct_nacional"]
    indice_medio = (f["pct_contrato"] * S.INDICE_CONTRATO + abierto * S.INDICE_ABIERTO
                    + nacional * S.INDICE_NACIONAL)
    costo_laboral = ha * f["personas_ha"] * f["costo_trabajador_cop_mes"] * 12 / f["trm"]
    destiempo = _rango(r.pct_flor_destiempo, S.PCT_FLOR_DESTIEMPO)

    escenarios = {}
    for e in S.ESCENARIOS:
        mejora = S.MEJORA_PRECIO_ABIERTO[e]
        precio = ingreso * abierto * S.INDICE_ABIERTO * mejora / indice_medio
        # Flor nacional que vuelve a exportación y se vende al nuevo precio de mercado abierto
        exportacion = (ingreso * nacional * S.RECUPERACION_NACIONAL[e]
                       * (S.INDICE_ABIERTO * (1 + mejora) - S.INDICE_NACIONAL) / indice_medio)
        escenarios[e] = {"palancas": [
            _palanca("horas_extra", "Menos cuadrillas y horas extra de última hora", costo_laboral * S.EFICIENCIA_LABORAL[e], ha),
            _palanca("flor_botada", "Menos flor que se bota por salir a destiempo", ingreso * destiempo[e] * S.FRACCION_EVITABLE_DESTIEMPO, ha),
            _palanca("precio", "Mejor precio en mercado abierto", precio, ha),
            _palanca("exportacion", "Menos flor que pierde su ventana de exportación", exportacion, ha),
        ]}

    costo_anual = f["camas"] * S.PRECIO_ESTIMADOS_CAMA_MES[r.plan_estimados] * 12
    resultado = {
        "id": "estimados",
        "nombre": "Estimados de producción",
        "descripcion": "Pronostica con 4 semanas cuánta flor vas a cosechar.",
        "plan": r.plan_estimados,
        "costo_anual_usd": costo_anual,
        "escenarios": _resumen(escenarios, costo_anual, ha),
        "mejora_error": None,
    }

    if r.error_estimado_actual is not None:
        actual = r.error_estimado_actual
        resultado["mejora_error"] = {
            "error_actual": actual,
            "metas": [
                {"meta": meta, "usd": {e: ha * S.V_MAX_HA[e] * max(actual - meta, 0) for e in S.ESCENARIOS}}
                for meta in (S.ERROR_META, S.ERROR_AGRESIVO)
            ],
        }
    return resultado


def valor_cajas(r: Respuestas, f: dict) -> dict:
    cajas = _o(r.cajas_ano, 0)
    pct_error = _o(r.pct_error_cajas, S.PCT_ERROR_CAJAS)
    costo_error_usd = _o(r.costo_error_caja_cop, S.COSTO_ERROR_CAJA_COP) / f["trm"]
    ha = f["hectareas"]
    escenarios = {
        e: {"palancas": [_palanca(
            "errores_despacho", "Menos errores de conteo en despacho",
            cajas * pct_error * costo_error_usd * S.REDUCCION_ERRORES_CAJAS[e], ha)]}
        for e in S.ESCENARIOS
    }
    return {
        "id": "cajas",
        "nombre": "Conteo de cajas",
        "descripcion": "Cuenta cajas por pallet con visión artificial antes del despacho.",
        "costo_anual_usd": None,  # precio aún sin definir (business-model-canvas.md §5)
        "escenarios": _resumen(escenarios, None, ha),
    }


def calcular(r: Respuestas) -> dict:
    f = contexto_finca(r)
    herramientas = [valor_botrytis(r, f), valor_estimados(r, f)]
    if r.incluye_cajas:
        herramientas.append(valor_cajas(r, f))

    total = {e: sum(h["escenarios"][e]["total_usd"] for h in herramientas) for e in S.ESCENARIOS}
    costo_total = sum(h["costo_anual_usd"] or 0 for h in herramientas)
    recomendada = max(herramientas[:2], key=lambda h: h["escenarios"]["medio"]["neto_usd"])["id"]
    return {
        "version_modelo": S.VERSION_MODELO,
        "finca": f,
        "herramientas": herramientas,
        "total_usd": total,
        "costo_total_usd": costo_total,
        "recomendada": recomendada,
    }

"""Supuestos del Diagnóstico de Valor AgriVision.

Cada constante cita el documento del repo `canvas/` de donde sale. Ninguna es
dato de piloto: son estimaciones del sector que se reemplazan cuando haya
mediciones reales. Si se cambia una cifra aquí, hay que cambiarla también en el
espejo JS de `diagnostico/index.html` (objeto SUPUESTOS) y correr los tests.
"""

VERSION_MODELO = "2026.10-v1"

ESCENARIOS = ("pesimista", "medio", "optimista")

# ---------------------------------------------------------------------------
# Finca de referencia (datos_sector_floricultor_2025.md, impacto_precio_mano_obra_100ha.md)
# ---------------------------------------------------------------------------
TRM = 4050                      # COP por USD
CAMAS_POR_HA = 57               # precios-agrivision.html
INGRESO_HA_USD = 225_800        # ingreso promedio sectorial 2025 por ha
PERSONAS_HA = 16
COSTO_TRABAJADOR_COP_MES = 2_335_000  # SMLV + prestaciones + auxilio de transporte

# Mezcla de canales e índice de precio relativo
# (escenarios_mercado_abierto_nacional_eficiencia_100ha.md)
PCT_CONTRATO = 0.65
PCT_ABIERTO = 0.30
PCT_NACIONAL = 0.05
INDICE_CONTRATO = 1.06
INDICE_ABIERTO = 0.95
INDICE_NACIONAL = 0.50

# ---------------------------------------------------------------------------
# Botrytis (costo-perdidas-botrytis.md §3-§4)
# ---------------------------------------------------------------------------
# % del ingreso que se pierde por Botrytis; 5% es el dato sectorial
# (informe_agrivision.md §2), 3% y 7% son los escenarios del documento.
PCT_PERDIDA_BOTRYTIS = {"pesimista": 0.03, "medio": 0.05, "optimista": 0.07}
# Reparto de la pérdida (supuesto #4 del documento, sin dato público)
REPARTO_BOTRYTIS = {
    "tallos_baja": 0.50,      # (d) tallos dados de baja en el cultivo
    "rechazos": 0.35,         # (c) mano de obra + materiales + flete de embarques rechazados
    "reclamos": 0.15,         # (b) notas crédito / descuentos por reclamos
}
# Fracción de la pérdida que la detección temprana evita. El documento fuente
# toma la pérdida completa como evitable; se deja explícito para poder ajustarlo
# cuando el piloto mida la tasa real de captura.
FRACCION_EVITABLE_BOTRYTIS = 1.0

FUNGICIDA_L_HA = 1.5            # L/ha por aplicación
FUNGICIDA_USD_L = 80            # Teldor SC, precio de menudeo (ancla débil)
APLICACIONES_ANO = {"pesimista": 15, "medio": 20, "optimista": 26}
REDUCCION_FUNGICIDA = {"pesimista": 0.20, "medio": 0.30, "optimista": 0.40}

# ---------------------------------------------------------------------------
# Estimados (valor-error-estimados-produccion.md §9.1,
#            escenarios_mercado_abierto_nacional_eficiencia_100ha.md)
# ---------------------------------------------------------------------------
MEJORA_PRECIO_ABIERTO = {"pesimista": 0.05, "medio": 0.08, "optimista": 0.12}
RECUPERACION_NACIONAL = {"pesimista": 0.30, "medio": 0.40, "optimista": 0.50}
EFICIENCIA_LABORAL = {"pesimista": 0.05, "medio": 0.075, "optimista": 0.10}
# Flor que sale a destiempo y se bota, como % del ingreso: 30-40% de pérdida
# poscosecha general × 10-20% atribuible al error de estimado (Ruta 3).
PCT_FLOR_DESTIEMPO = {"pesimista": 0.03, "medio": 0.055, "optimista": 0.08}
# Descuento de solape con los otros mecanismos (supuesto #15)
FRACCION_EVITABLE_DESTIEMPO = 0.5

# Valor de bajar el error de estimado (MAPE), V_max en USD/ha/año por cada
# 100 puntos de error (§6.2, posterior bayesiano Ciclo 2).
V_MAX_HA = {"pesimista": 9_925, "medio": 14_620, "optimista": 19_313}
ERROR_META = 0.15
ERROR_AGRESIVO = 0.10

# ---------------------------------------------------------------------------
# Cajas (docs/buyer_persona*.md, pricing-cost-hypothesis.md §1.6)
# ---------------------------------------------------------------------------
PCT_ERROR_CAJAS = 0.001                 # 0,1% de cajas con error de conteo
COSTO_ERROR_CAJA_COP = 1_100_000        # punto medio de COP 200K-2M por devolución
# Supuesto propio, sin fuente: fracción de errores que el conteo automático
# evita (el modelo mide 97,45% mAP50 en laboratorio).
REDUCCION_ERRORES_CAJAS = {"pesimista": 0.50, "medio": 0.70, "optimista": 0.85}

# ---------------------------------------------------------------------------
# Precios AgriVision (precios-agrivision.html, 19-ago-2026)
# ---------------------------------------------------------------------------
PRECIO_ESTIMADOS_CAMA_MES = {"arranque": 0.35, "temprano": 0.49, "estandar": 0.70}
PRECIO_BOTRYTIS_VIGILANCIA_CAMA_MES = 0.27
PRECIO_BOTRYTIS_INFORME = 630           # punto medio de USD 360-900 por informe
PRECIO_BOTRYTIS_SELLO = 405             # punto medio de USD 270-540 por lote
INFORMES_DESPACHO_ANO = 40
LOTES_SELLO_ANO = 40

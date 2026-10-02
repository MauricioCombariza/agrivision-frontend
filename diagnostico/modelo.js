/* Espejo JS de diagnostico/backend/app/modelo.py.
 * Se usa para la vista previa en vivo y como respaldo si la API no responde;
 * el resultado que se guarda siempre lo recalcula el servidor.
 * Cualquier cambio aquí debe reflejarse en supuestos.py / modelo.py y pasar
 * `node backend/tests/espejo_js.mjs`. */
(function (raiz) {
  const ESCENARIOS = ["pesimista", "medio", "optimista"];

  const S = {
    VERSION_MODELO: "2026.10-v1",
    TRM: 4050,
    CAMAS_POR_HA: 57,
    INGRESO_HA_USD: 225800,
    PERSONAS_HA: 16,
    COSTO_TRABAJADOR_COP_MES: 2335000,
    PCT_CONTRATO: 0.65, PCT_ABIERTO: 0.30, PCT_NACIONAL: 0.05,
    INDICE_CONTRATO: 1.06, INDICE_ABIERTO: 0.95, INDICE_NACIONAL: 0.50,
    PCT_PERDIDA_BOTRYTIS: { pesimista: 0.03, medio: 0.05, optimista: 0.07 },
    REPARTO_BOTRYTIS: { tallos_baja: 0.50, rechazos: 0.35, reclamos: 0.15 },
    FRACCION_EVITABLE_BOTRYTIS: 1.0,
    FUNGICIDA_L_HA: 1.5,
    FUNGICIDA_USD_L: 80,
    APLICACIONES_ANO: { pesimista: 15, medio: 20, optimista: 26 },
    REDUCCION_FUNGICIDA: { pesimista: 0.20, medio: 0.30, optimista: 0.40 },
    MEJORA_PRECIO_ABIERTO: { pesimista: 0.05, medio: 0.08, optimista: 0.12 },
    RECUPERACION_NACIONAL: { pesimista: 0.30, medio: 0.40, optimista: 0.50 },
    EFICIENCIA_LABORAL: { pesimista: 0.05, medio: 0.075, optimista: 0.10 },
    PCT_FLOR_DESTIEMPO: { pesimista: 0.03, medio: 0.055, optimista: 0.08 },
    FRACCION_EVITABLE_DESTIEMPO: 0.5,
    V_MAX_HA: { pesimista: 9925, medio: 14620, optimista: 19313 },
    ERROR_META: 0.15,
    ERROR_AGRESIVO: 0.10,
    PCT_ERROR_CAJAS: 0.001,
    COSTO_ERROR_CAJA_COP: 1100000,
    REDUCCION_ERRORES_CAJAS: { pesimista: 0.50, medio: 0.70, optimista: 0.85 },
    PRECIO_ESTIMADOS_CAMA_MES: { arranque: 0.35, temprano: 0.49, estandar: 0.70 },
    PRECIO_BOTRYTIS_VIGILANCIA_CAMA_MES: 0.27,
    PRECIO_BOTRYTIS_INFORME: 630,
    PRECIO_BOTRYTIS_SELLO: 405,
    INFORMES_DESPACHO_ANO: 40,
    LOTES_SELLO_ANO: 40,
  };

  const o = (v, d) => (v === null || v === undefined ? d : v);

  function rango(valorUsuario, porEscenario) {
    if (valorUsuario === null || valorUsuario === undefined) return { ...porEscenario };
    const r = {};
    for (const e of ESCENARIOS) r[e] = valorUsuario * porEscenario[e] / porEscenario.medio;
    return r;
  }

  function contextoFinca(r) {
    const ha = r.hectareas;
    let canales = [r.pct_contrato, r.pct_abierto, r.pct_nacional];
    let [contrato, abierto, nacional] = [S.PCT_CONTRATO, S.PCT_ABIERTO, S.PCT_NACIONAL];
    if (!canales.some(c => c === null || c === undefined)) {
      const total = canales.reduce((a, b) => a + b, 0);
      if (total > 0) [contrato, abierto, nacional] = canales.map(c => c / total);
    }
    return {
      hectareas: ha,
      camas: ha * o(r.camas_ha, S.CAMAS_POR_HA),
      ingreso_anual_usd: o(r.ingreso_anual_usd, S.INGRESO_HA_USD * ha),
      pct_contrato: contrato, pct_abierto: abierto, pct_nacional: nacional,
      personas_ha: o(r.personas_ha, S.PERSONAS_HA),
      costo_trabajador_cop_mes: o(r.costo_trabajador_cop_mes, S.COSTO_TRABAJADOR_COP_MES),
      trm: o(r.trm, S.TRM),
    };
  }

  const palanca = (id, nombre, usd, ha) => ({ id, nombre, usd, usd_ha: ha ? usd / ha : 0 });

  function resumen(escenarios, costo, ha) {
    for (const esc of Object.values(escenarios)) {
      const total = esc.palancas.reduce((a, p) => a + p.usd, 0);
      esc.total_usd = total;
      esc.total_usd_ha = ha ? total / ha : 0;
      esc.neto_usd = total - (costo || 0);
      esc.multiplo = costo ? total / costo : null;
      esc.payback_meses = costo && total > 0 ? 12 * costo / total : null;
    }
    return escenarios;
  }

  function valorBotrytis(r, f) {
    const ha = f.hectareas, ingreso = f.ingreso_anual_usd;
    const perdida = rango(r.pct_perdida_botrytis, S.PCT_PERDIDA_BOTRYTIS);
    const aplicaciones = rango(r.aplicaciones_ano, S.APLICACIONES_ANO);
    const litros = o(r.fungicida_l_ha, S.FUNGICIDA_L_HA);
    const usdL = o(r.fungicida_usd_l, S.FUNGICIDA_USD_L);
    const escenarios = {};
    for (const e of ESCENARIOS) {
      const evitable = ingreso * perdida[e] * S.FRACCION_EVITABLE_BOTRYTIS;
      const fungicida = ha * litros * usdL * aplicaciones[e] * S.REDUCCION_FUNGICIDA[e];
      escenarios[e] = { palancas: [
        palanca("tallos_baja", "Menos flor perdida en el cultivo", evitable * S.REPARTO_BOTRYTIS.tallos_baja, ha),
        palanca("rechazos", "Menos embarques rechazados", evitable * S.REPARTO_BOTRYTIS.rechazos, ha),
        palanca("reclamos", "Menos descuentos por reclamos", evitable * S.REPARTO_BOTRYTIS.reclamos, ha),
        palanca("fungicida", "Menos fungicida aplicado a ciegas", fungicida, ha),
      ] };
    }
    const costo = {
      vigilancia: f.camas * S.PRECIO_BOTRYTIS_VIGILANCIA_CAMA_MES * 12,
      informes: o(r.informes_despacho_ano, S.INFORMES_DESPACHO_ANO) * S.PRECIO_BOTRYTIS_INFORME,
      sellos: o(r.lotes_sello_ano, S.LOTES_SELLO_ANO) * S.PRECIO_BOTRYTIS_SELLO,
    };
    const costoAnual = costo.vigilancia + costo.informes + costo.sellos;
    return {
      id: "botrytis", nombre: "Botrytis",
      descripcion: "Detecta el moho gris antes de que se vea a simple vista.",
      costo_anual_usd: costoAnual, costo_detalle: costo,
      escenarios: resumen(escenarios, costoAnual, ha),
    };
  }

  function valorEstimados(r, f) {
    const ha = f.hectareas, ingreso = f.ingreso_anual_usd;
    const abierto = f.pct_abierto, nacional = f.pct_nacional;
    const indiceMedio = f.pct_contrato * S.INDICE_CONTRATO + abierto * S.INDICE_ABIERTO + nacional * S.INDICE_NACIONAL;
    const costoLaboral = ha * f.personas_ha * f.costo_trabajador_cop_mes * 12 / f.trm;
    const destiempo = rango(r.pct_flor_destiempo, S.PCT_FLOR_DESTIEMPO);
    const escenarios = {};
    for (const e of ESCENARIOS) {
      const mejora = S.MEJORA_PRECIO_ABIERTO[e];
      const precio = ingreso * abierto * S.INDICE_ABIERTO * mejora / indiceMedio;
      const exportacion = ingreso * nacional * S.RECUPERACION_NACIONAL[e]
        * (S.INDICE_ABIERTO * (1 + mejora) - S.INDICE_NACIONAL) / indiceMedio;
      escenarios[e] = { palancas: [
        palanca("horas_extra", "Menos cuadrillas y horas extra de última hora", costoLaboral * S.EFICIENCIA_LABORAL[e], ha),
        palanca("flor_botada", "Menos flor que se bota por salir a destiempo", ingreso * destiempo[e] * S.FRACCION_EVITABLE_DESTIEMPO, ha),
        palanca("precio", "Mejor precio en mercado abierto", precio, ha),
        palanca("exportacion", "Menos flor que pierde su ventana de exportación", exportacion, ha),
      ] };
    }
    const plan = r.plan_estimados || "arranque";
    const costoAnual = f.camas * S.PRECIO_ESTIMADOS_CAMA_MES[plan] * 12;
    const res = {
      id: "estimados", nombre: "Estimados de producción",
      descripcion: "Pronostica con 4 semanas cuánta flor vas a cosechar.",
      plan, costo_anual_usd: costoAnual,
      escenarios: resumen(escenarios, costoAnual, ha),
      mejora_error: null,
    };
    if (r.error_estimado_actual !== null && r.error_estimado_actual !== undefined) {
      const actual = r.error_estimado_actual;
      res.mejora_error = {
        error_actual: actual,
        metas: [S.ERROR_META, S.ERROR_AGRESIVO].map(meta => {
          const usd = {};
          for (const e of ESCENARIOS) usd[e] = ha * S.V_MAX_HA[e] * Math.max(actual - meta, 0);
          return { meta, usd };
        }),
      };
    }
    return res;
  }

  function valorCajas(r, f) {
    const cajas = o(r.cajas_ano, 0);
    const pctError = o(r.pct_error_cajas, S.PCT_ERROR_CAJAS);
    const costoErrorUsd = o(r.costo_error_caja_cop, S.COSTO_ERROR_CAJA_COP) / f.trm;
    const escenarios = {};
    for (const e of ESCENARIOS) {
      escenarios[e] = { palancas: [palanca("errores_despacho", "Menos errores de conteo en despacho",
        cajas * pctError * costoErrorUsd * S.REDUCCION_ERRORES_CAJAS[e], f.hectareas)] };
    }
    return {
      id: "cajas", nombre: "Conteo de cajas",
      descripcion: "Cuenta cajas por pallet con visión artificial antes del despacho.",
      costo_anual_usd: null,
      escenarios: resumen(escenarios, null, f.hectareas),
    };
  }

  function calcular(r) {
    const f = contextoFinca(r);
    const herramientas = [valorBotrytis(r, f), valorEstimados(r, f)];
    if (r.incluye_cajas) herramientas.push(valorCajas(r, f));
    const total = {};
    for (const e of ESCENARIOS) total[e] = herramientas.reduce((a, h) => a + h.escenarios[e].total_usd, 0);
    const costoTotal = herramientas.reduce((a, h) => a + (h.costo_anual_usd || 0), 0);
    const [b, est] = herramientas;
    const recomendada = est.escenarios.medio.neto_usd > b.escenarios.medio.neto_usd ? "estimados" : "botrytis";
    return { version_modelo: S.VERSION_MODELO, finca: f, herramientas, total_usd: total,
      costo_total_usd: costoTotal, recomendada };
  }

  const api = { calcular, SUPUESTOS: S, ESCENARIOS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else raiz.ModeloAgrivision = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

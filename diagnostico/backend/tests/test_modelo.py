import json
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.modelo import calcular
from app.schemas import Contacto, Respuestas

CASOS = json.loads((Path(__file__).parent / "casos.json").read_text())


def _herr(res, id_):
    return next(h for h in res["herramientas"] if h["id"] == id_)


# Cifras de precios-y-valor-agregado-100ha.md (USD/ha/año)
REFERENCIA = {
    "botrytis": {"pesimista": 7_134, "medio": 12_010, "optimista": 17_054},
    "estimados": {"pesimista": 13_800, "medio": 21_985, "optimista": 31_040},
}


@pytest.mark.parametrize("herramienta", ["botrytis", "estimados"])
@pytest.mark.parametrize("escenario", ["pesimista", "medio", "optimista"])
def test_finca_referencia_reproduce_documentos(herramienta, escenario):
    res = calcular(Respuestas(hectareas=100))
    obtenido = _herr(res, herramienta)["escenarios"][escenario]["total_usd_ha"]
    assert obtenido == pytest.approx(REFERENCIA[herramienta][escenario], rel=0.01)


def test_precios_referencia():
    res = calcular(Respuestas(hectareas=100))
    # precios-agrivision.html: Estimados arranque USD 24.000, Botrytis ≈ USD 60.000
    assert _herr(res, "estimados")["costo_anual_usd"] == pytest.approx(23_940, rel=0.01)
    assert _herr(res, "botrytis")["costo_anual_usd"] == pytest.approx(60_000, rel=0.01)


def test_dato_propio_es_escenario_medio():
    res = calcular(Respuestas(hectareas=10, ingreso_anual_usd=1_000_000, pct_perdida_botrytis=0.02))
    esc = _herr(res, "botrytis")["escenarios"]
    perdida_medio = sum(p["usd"] for p in esc["medio"]["palancas"] if p["id"] != "fungicida")
    assert perdida_medio == pytest.approx(20_000)
    assert esc["pesimista"]["total_usd"] < esc["medio"]["total_usd"] < esc["optimista"]["total_usd"]


def test_sin_exportacion_ni_mercado_abierto():
    res = calcular(Respuestas(hectareas=5, pct_contrato=1, pct_abierto=0, pct_nacional=0))
    palancas = {p["id"]: p["usd"] for p in _herr(res, "estimados")["escenarios"]["medio"]["palancas"]}
    assert palancas["precio"] == 0
    assert palancas["exportacion"] == 0


def test_cajas_opcional():
    sin = calcular(Respuestas(hectareas=20))
    assert [h["id"] for h in sin["herramientas"]] == ["botrytis", "estimados"]
    con = calcular(Respuestas(hectareas=20, incluye_cajas=True, cajas_ano=100_000))
    cajas = _herr(con, "cajas")
    # 100.000 cajas × 0,1% × COP 1,1M / 4.050 × 70%
    assert cajas["escenarios"]["medio"]["total_usd"] == pytest.approx(100_000 * 0.001 * 1_100_000 / 4050 * 0.7)
    assert cajas["costo_anual_usd"] is None


def test_mejora_error():
    res = calcular(Respuestas(hectareas=100, error_estimado_actual=0.20))
    metas = _herr(res, "estimados")["mejora_error"]["metas"]
    # valor-error-estimados-produccion.md: 20%→15% ≈ USD 73.100 en 100 ha
    assert metas[0]["usd"]["medio"] == pytest.approx(73_100)
    assert metas[1]["usd"]["medio"] == pytest.approx(146_200)


def test_validaciones():
    with pytest.raises(ValidationError):
        Respuestas(hectareas=0)
    with pytest.raises(ValidationError):
        Respuestas(hectareas=10, pct_contrato=0.5, pct_abierto=0.5, pct_nacional=0.5)
    with pytest.raises(ValidationError):
        Contacto(nombre="Ana", finca="La Esperanza", email="a@b.co", consentimiento=False)
    with pytest.raises(ValidationError):
        Contacto(nombre="Ana", finca="La Esperanza", consentimiento=True)


@pytest.mark.parametrize("caso", CASOS, ids=[c["nombre"] for c in CASOS])
def test_casos_compartidos_con_js(caso):
    """Mismos casos que valida el espejo JS (tests/espejo_js.mjs)."""
    res = calcular(Respuestas(**caso["respuestas"]))
    for id_, esperado in caso["esperado_medio_usd"].items():
        assert _herr(res, id_)["escenarios"]["medio"]["total_usd"] == pytest.approx(esperado, rel=1e-6)

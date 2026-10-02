import pytest
from fastapi.testclient import TestClient

from app import db, main

ENVIO = {
    "respuestas": {"hectareas": 40, "producto": "rosa", "region": "Sabana de Bogotá"},
    "contacto": {"nombre": "Ana Pérez", "finca": "La Esperanza", "whatsapp": "+57 300 000 0000",
                 "consentimiento": True},
}


@pytest.fixture
def cliente(tmp_path, monkeypatch):
    monkeypatch.setenv("DB_URL", f"sqlite:///{tmp_path}/t.db")
    monkeypatch.setenv("ADMIN_TOKEN", "secreto")
    monkeypatch.setattr(db, "_engine", None)
    main._ventanas.clear()
    return TestClient(main.app)


def test_calcular_no_guarda(cliente):
    r = cliente.post("/api/diagnostico/calcular", json={"hectareas": 100})
    assert r.status_code == 200
    assert r.json()["recomendada"] in ("botrytis", "estimados")
    assert db.listar() == []


def test_guardar_y_panel(cliente):
    r = cliente.post("/api/diagnostico/diagnosticos", json=ENVIO)
    assert r.status_code == 200
    id_ = r.json()["id"]

    assert cliente.get("/api/diagnostico/admin/diagnosticos").status_code == 401
    auth = {"Authorization": "Bearer secreto"}
    filas = cliente.get("/api/diagnostico/admin/diagnosticos", headers=auth).json()
    assert filas[0]["finca"] == "La Esperanza" and filas[0]["valor_total_usd"] > 0
    assert cliente.get(f"/api/diagnostico/admin/diagnosticos/{id_}", headers=auth).json()["respuestas"]["hectareas"] == 40
    res = cliente.get("/api/diagnostico/admin/resumen", headers=auth).json()
    assert res["diagnosticos"] == 1 and res["hectareas"] == 40
    csv = cliente.get("/api/diagnostico/admin/export.csv", headers=auth)
    assert "La Esperanza" in csv.text


def test_sin_consentimiento_rechaza(cliente):
    envio = {**ENVIO, "contacto": {**ENVIO["contacto"], "consentimiento": False}}
    assert cliente.post("/api/diagnostico/diagnosticos", json=envio).status_code == 422


def test_limite_de_envios(cliente):
    codigos = [cliente.post("/api/diagnostico/diagnosticos", json=ENVIO).status_code for _ in range(11)]
    assert codigos[-1] == 429

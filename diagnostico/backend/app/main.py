"""API del Diagnóstico de Valor AgriVision.

Caddy enruta api.combariza.com/api/diagnostico/* a este servicio sin quitar el
prefijo, por eso todas las rutas viven bajo PREFIJO.
"""

import csv
import io
import os
import secrets
import time
from collections import defaultdict, deque

from fastapi import APIRouter, Depends, FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from . import db
from .modelo import calcular
from .schemas import Envio, Respuestas

PREFIJO = "/api/diagnostico"
ORIGENES = [o.strip() for o in os.environ.get(
    "CORS_ORIGINS",
    "https://www.combariza.com,https://combariza.com,http://localhost:5173,http://localhost:8080,null",
).split(",") if o.strip()]

app = FastAPI(title="Diagnóstico AgriVision", docs_url=f"{PREFIJO}/docs",
              openapi_url=f"{PREFIJO}/openapi.json")
app.add_middleware(CORSMiddleware, allow_origins=ORIGENES, allow_methods=["GET", "POST"],
                   allow_headers=["Content-Type", "Authorization"])
api = APIRouter(prefix=PREFIJO)


# --- Límite de solicitudes en memoria (un solo proceso uvicorn) -------------
_ventanas: dict[tuple[str, str], deque] = defaultdict(deque)


def limite(nombre: str, maximo: int, segundos: int = 60):
    def _dep(request: Request):
        ip = (request.headers.get("x-forwarded-for") or request.client.host).split(",")[0].strip()
        ventana = _ventanas[(nombre, ip)]
        ahora = time.monotonic()
        while ventana and ahora - ventana[0] > segundos:
            ventana.popleft()
        if len(ventana) >= maximo:
            raise HTTPException(429, "Demasiadas solicitudes, intenta en un minuto.")
        ventana.append(ahora)
    return _dep


def admin(authorization: str = Header(default="")):
    token = os.environ.get("ADMIN_TOKEN", "")
    if not token or not secrets.compare_digest(authorization, f"Bearer {token}"):
        raise HTTPException(401, "Token inválido")


# --- Rutas públicas ---------------------------------------------------------
@api.get("/salud")
def salud():
    return {"ok": True}


@api.post("/calcular", dependencies=[Depends(limite("calcular", 120))])
def calcular_ruta(respuestas: Respuestas):
    return calcular(respuestas)


@api.post("/diagnosticos", dependencies=[Depends(limite("guardar", 10))])
def guardar(envio: Envio):
    resultado = calcular(envio.respuestas)
    return {"id": db.guardar(envio, resultado), "resultado": resultado}


# --- Rutas internas (panel de leads) ---------------------------------------
@api.get("/admin/diagnosticos", dependencies=[Depends(admin)])
def listar(limite: int = 500, desde: int = 0):
    return db.listar(min(limite, 2000), desde)


@api.get("/admin/diagnosticos/{id_}", dependencies=[Depends(admin)])
def detalle(id_: int):
    fila = db.detalle(id_)
    if not fila:
        raise HTTPException(404, "No existe")
    return fila


@api.get("/admin/resumen", dependencies=[Depends(admin)])
def resumen():
    return db.resumen()


@api.get("/admin/export.csv", dependencies=[Depends(admin)])
def exportar():
    filas = db.listar(limite=100_000)
    buf = io.StringIO()
    columnas = [c.name for c in db.COLUMNAS_LISTADO]
    w = csv.DictWriter(buf, fieldnames=columnas)
    w.writeheader()
    w.writerows(filas)
    return StreamingResponse(
        iter(["﻿" + buf.getvalue()]), media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": "attachment; filename=diagnosticos_agrivision.csv"},
    )


app.include_router(api)

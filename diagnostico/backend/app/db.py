"""Persistencia de diagnósticos. MySQL en producción (DB_URL=mysql+pymysql://...),
SQLite para pruebas locales."""

import os
from datetime import datetime, timezone

import sqlalchemy as sa

metadata = sa.MetaData()

diagnosticos = sa.Table(
    "diagnosticos", metadata,
    sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
    sa.Column("creado", sa.DateTime, nullable=False, index=True),
    sa.Column("version_modelo", sa.String(20), nullable=False),
    sa.Column("nombre", sa.String(120), nullable=False),
    sa.Column("finca", sa.String(160), nullable=False),
    sa.Column("cargo", sa.String(120)),
    sa.Column("email", sa.String(254)),
    sa.Column("whatsapp", sa.String(30)),
    sa.Column("region", sa.String(80)),
    sa.Column("consentimiento", sa.Boolean, nullable=False),
    sa.Column("hectareas", sa.Float, nullable=False),
    sa.Column("producto", sa.String(20), nullable=False),
    sa.Column("pct_export", sa.Float),
    sa.Column("incluye_cajas", sa.Boolean, nullable=False),
    sa.Column("valor_botrytis_usd", sa.Float),
    sa.Column("valor_estimados_usd", sa.Float),
    sa.Column("valor_cajas_usd", sa.Float),
    sa.Column("valor_total_usd", sa.Float),
    sa.Column("respuestas", sa.JSON, nullable=False),
    sa.Column("resultado", sa.JSON, nullable=False),
)

_engine = None


def engine():
    global _engine
    if _engine is None:
        _engine = sa.create_engine(
            os.environ.get("DB_URL", "sqlite:///./diagnostico.db"),
            pool_pre_ping=True, pool_recycle=3600,
        )
        metadata.create_all(_engine)
    return _engine


def guardar(envio, resultado) -> int:
    r, c = envio.respuestas, envio.contacto
    medio = {h["id"]: h["escenarios"]["medio"]["total_usd"] for h in resultado["herramientas"]}
    finca = resultado["finca"]
    fila = {
        "creado": datetime.now(timezone.utc).replace(tzinfo=None),
        "version_modelo": resultado["version_modelo"],
        "nombre": c.nombre, "finca": c.finca, "cargo": c.cargo,
        "email": c.email, "whatsapp": c.whatsapp, "region": r.region,
        "consentimiento": c.consentimiento,
        "hectareas": r.hectareas, "producto": r.producto,
        "pct_export": finca["pct_contrato"] + finca["pct_abierto"],
        "incluye_cajas": r.incluye_cajas,
        "valor_botrytis_usd": medio.get("botrytis"),
        "valor_estimados_usd": medio.get("estimados"),
        "valor_cajas_usd": medio.get("cajas"),
        "valor_total_usd": resultado["total_usd"]["medio"],
        "respuestas": r.model_dump(mode="json"),
        "resultado": resultado,
    }
    with engine().begin() as conn:
        return conn.execute(diagnosticos.insert().values(**fila)).inserted_primary_key[0]


COLUMNAS_LISTADO = [c for c in diagnosticos.c if c.name not in ("respuestas", "resultado")]


def listar(limite=500, desde=0):
    q = (sa.select(*COLUMNAS_LISTADO).order_by(diagnosticos.c.id.desc())
         .limit(limite).offset(desde))
    with engine().connect() as conn:
        return [dict(f._mapping) for f in conn.execute(q)]


def detalle(id_):
    with engine().connect() as conn:
        fila = conn.execute(sa.select(diagnosticos).where(diagnosticos.c.id == id_)).first()
        return dict(fila._mapping) if fila else None


def resumen():
    d = diagnosticos.c
    with engine().connect() as conn:
        totales = conn.execute(sa.select(
            sa.func.count(), sa.func.sum(d.hectareas),
            sa.func.avg(d.valor_botrytis_usd), sa.func.avg(d.valor_estimados_usd),
            sa.func.avg(d.valor_cajas_usd), sa.func.sum(d.valor_total_usd),
        )).one()
        por_producto = conn.execute(
            sa.select(d.producto, sa.func.count(), sa.func.sum(d.hectareas)).group_by(d.producto)
        ).all()
        por_region = conn.execute(
            sa.select(d.region, sa.func.count()).group_by(d.region).order_by(sa.func.count().desc())
        ).all()
    return {
        "diagnosticos": totales[0],
        "hectareas": totales[1] or 0,
        "promedio_botrytis_usd": totales[2],
        "promedio_estimados_usd": totales[3],
        "promedio_cajas_usd": totales[4],
        "valor_total_usd": totales[5] or 0,
        "por_producto": [{"producto": p, "diagnosticos": n, "hectareas": h} for p, n, h in por_producto],
        "por_region": [{"region": r or "Sin dato", "diagnosticos": n} for r, n in por_region],
    }

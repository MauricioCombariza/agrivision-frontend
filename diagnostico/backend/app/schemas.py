"""Entradas del cuestionario. Todo campo opcional que llega en None se
reemplaza por el promedio del sector definido en `supuestos.py`."""

from typing import Literal, Optional

from pydantic import BaseModel, EmailStr, Field, model_validator


class Respuestas(BaseModel):
    # Tu finca
    hectareas: float = Field(gt=0, le=5000)
    camas_ha: Optional[float] = Field(None, gt=0, le=200)
    producto: Literal["rosa", "clavel", "alstroemeria", "otro"] = "rosa"
    region: Optional[str] = Field(None, max_length=80)

    # Producción y ventas
    ingreso_anual_usd: Optional[float] = Field(None, gt=0, le=2e9)
    pct_contrato: Optional[float] = Field(None, ge=0, le=1)
    pct_abierto: Optional[float] = Field(None, ge=0, le=1)
    pct_nacional: Optional[float] = Field(None, ge=0, le=1)
    personas_ha: Optional[float] = Field(None, gt=0, le=60)
    costo_trabajador_cop_mes: Optional[float] = Field(None, gt=0, le=20_000_000)
    trm: Optional[float] = Field(None, ge=2000, le=8000)

    # Botrytis hoy
    pct_perdida_botrytis: Optional[float] = Field(None, ge=0, le=0.5)
    fungicida_l_ha: Optional[float] = Field(None, ge=0, le=50)
    fungicida_usd_l: Optional[float] = Field(None, ge=0, le=1000)
    aplicaciones_ano: Optional[float] = Field(None, ge=0, le=120)
    informes_despacho_ano: Optional[int] = Field(None, ge=0, le=500)
    lotes_sello_ano: Optional[int] = Field(None, ge=0, le=500)

    # Planeación y estimados
    pct_flor_destiempo: Optional[float] = Field(None, ge=0, le=0.5)
    error_estimado_actual: Optional[float] = Field(None, ge=0, le=1)
    plan_estimados: Literal["arranque", "temprano", "estandar"] = "arranque"

    # Cajas (opcional)
    incluye_cajas: bool = False
    cajas_ano: Optional[float] = Field(None, ge=0, le=1e9)
    pct_error_cajas: Optional[float] = Field(None, ge=0, le=0.5)
    costo_error_caja_cop: Optional[float] = Field(None, ge=0, le=100_000_000)

    @model_validator(mode="after")
    def _mezcla_canales(self):
        partes = [self.pct_contrato, self.pct_abierto, self.pct_nacional]
        dados = [p for p in partes if p is not None]
        if len(dados) == 3 and abs(sum(dados) - 1) > 0.02:
            raise ValueError("contrato + mercado abierto + nacional debe sumar 100%")
        return self


class Contacto(BaseModel):
    nombre: str = Field(min_length=2, max_length=120)
    finca: str = Field(min_length=2, max_length=160)
    cargo: Optional[str] = Field(None, max_length=120)
    email: Optional[EmailStr] = None
    whatsapp: Optional[str] = Field(None, max_length=30)
    consentimiento: bool

    @model_validator(mode="after")
    def _canal_y_consentimiento(self):
        if not self.consentimiento:
            raise ValueError("se requiere autorización de tratamiento de datos (Ley 1581)")
        if not (self.email or self.whatsapp):
            raise ValueError("indica un email o un WhatsApp")
        return self


class Envio(BaseModel):
    respuestas: Respuestas
    contacto: Contacto

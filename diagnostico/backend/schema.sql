-- Diagnóstico de Valor AgriVision. Idempotente: se puede correr en cada deploy.
-- La app crea la tabla sola (SQLAlchemy create_all); este archivo documenta el
-- esquema y crea la base y el usuario dedicados. Las variables @pw las pone deploy.sh.
CREATE DATABASE IF NOT EXISTS agrivision_diag CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS agrivision_diag.diagnosticos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  creado DATETIME NOT NULL,
  version_modelo VARCHAR(20) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  finca VARCHAR(160) NOT NULL,
  cargo VARCHAR(120),
  email VARCHAR(254),
  whatsapp VARCHAR(30),
  region VARCHAR(80),
  consentimiento BOOLEAN NOT NULL,
  hectareas FLOAT NOT NULL,
  producto VARCHAR(20) NOT NULL,
  pct_export FLOAT,
  incluye_cajas BOOLEAN NOT NULL,
  valor_botrytis_usd FLOAT,
  valor_estimados_usd FLOAT,
  valor_cajas_usd FLOAT,
  valor_total_usd FLOAT,
  respuestas JSON NOT NULL,
  resultado JSON NOT NULL,
  INDEX ix_diagnosticos_creado (creado)
);

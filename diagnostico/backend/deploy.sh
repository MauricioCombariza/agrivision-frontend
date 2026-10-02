#!/usr/bin/env bash
# Despliega la API del Diagnóstico de Valor al VPS Hetzner, mismo patrón que
# alstroemeria/vision/backend/deploy.sh: rsync del código, build de la imagen en
# el servidor y recreación del contenedor.
#
#   bash deploy.sh
#
# Usa el MySQL que ya corre en el host (127.0.0.1:3306), por eso el contenedor
# va con --network host y uvicorn escucha solo en 127.0.0.1:8030.
#
# La primera vez crea la base agrivision_diag, el usuario diag_app con permisos
# solo sobre ella y /etc/diagnostico.env con la clave y el ADMIN_TOKEN del
# panel. Ese archivo no se versiona; el token se lee con:
#   ssh -i ~/.ssh/agrivision_vps root@204.168.150.196 grep ADMIN_TOKEN /etc/diagnostico.env
#
# Caddy (una sola vez, a mano): dentro del bloque api.combariza.com, antes del
# `handle {` final:
#     handle /api/diagnostico/* {
#         reverse_proxy localhost:8030
#     }
#     redir /diagnostico /diagnostico/
#     handle_path /diagnostico/* {
#         root * /opt/diagnostico-web
#         file_server
#     }
set -euo pipefail

SERVER="root@204.168.150.196"
SSH_KEY="$HOME/.ssh/agrivision_vps"
REMOTE_DIR="/opt/diagnostico"
IMAGE="diagnostico"
CONTAINER="diagnostico"
PUERTO=8030
ENV_FILE="/etc/diagnostico.env"
WEB_DIR="/opt/diagnostico-web"
# root no entra por socket en este VPS; el usuario de mantenimiento de Debian sí.
MYSQL_ADMIN="mysql --defaults-file=/etc/mysql/debian.cnf"
ORIGENES="https://www.combariza.com,https://combariza.com"

ssh_() { ssh -i "$SSH_KEY" -o ConnectTimeout=15 "$SERVER" "$@"; }

cd "$(dirname "$0")"

echo "==> Sincronizando código"
rsync -az --delete \
  --exclude='__pycache__' --exclude='*.pyc' --exclude='tests' --exclude='*.db' --exclude='.env' \
  -e "ssh -i $SSH_KEY" \
  ./ "$SERVER:$REMOTE_DIR/"

echo "==> Publicando el cuestionario (servido por Caddy en api.combariza.com/diagnostico/)"
python3 ../build.py >/dev/null
ssh_ "mkdir -p $WEB_DIR"
rsync -az --delete -e "ssh -i $SSH_KEY" ../index.html ../admin.html ../modelo.js "$SERVER:$WEB_DIR/"

echo "==> Base de datos y secretos"
ssh_ "
  set -e
  if [ ! -f $ENV_FILE ]; then
    PW=\$(openssl rand -hex 24)
    TOKEN=\$(openssl rand -hex 24)
    $MYSQL_ADMIN -e \"CREATE USER IF NOT EXISTS 'diag_app'@'localhost' IDENTIFIED BY '\$PW';\"
    umask 077
    printf 'DB_URL=mysql+pymysql://diag_app:%s@127.0.0.1:3306/agrivision_diag?charset=utf8mb4\nADMIN_TOKEN=%s\nCORS_ORIGINS=$ORIGENES\n' \"\$PW\" \"\$TOKEN\" > $ENV_FILE
    echo '    creado $ENV_FILE'
  fi
  $MYSQL_ADMIN < $REMOTE_DIR/schema.sql
  $MYSQL_ADMIN -e \"GRANT SELECT, INSERT ON agrivision_diag.* TO 'diag_app'@'localhost'; FLUSH PRIVILEGES;\"
  echo '    ok'
"

echo "==> Construyendo imagen"
ssh_ "cd $REMOTE_DIR && docker build -q -t $IMAGE . >/dev/null && echo '    ok'"

echo "==> Recreando contenedor"
ssh_ "
  docker rm -f $CONTAINER 2>/dev/null || true
  docker run -d \
    --name $CONTAINER \
    --restart unless-stopped \
    --network host \
    -e PUERTO=$PUERTO \
    --env-file $ENV_FILE \
    $IMAGE >/dev/null
"

echo "==> Verificando"
sleep 3
ssh_ "curl -fsS http://127.0.0.1:$PUERTO/api/diagnostico/salud" && echo
echo "Listo. Público: https://api.combariza.com/api/diagnostico/salud (requiere la ruta en Caddy)"

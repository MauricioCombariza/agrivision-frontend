FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
ENV PUERTO=8030
CMD ["sh", "-c", "uvicorn app.main:app --host 127.0.0.1 --port ${PUERTO} --proxy-headers --forwarded-allow-ips=127.0.0.1"]

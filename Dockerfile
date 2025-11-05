FROM python:3.12-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY . /app

RUN chmod +x /app/serhas-cli.py

RUN pip install --no-cache-dir -r /app/requirements.txt

CMD ["sh", "-c", "alembic upgrade head && python3 main.py"]

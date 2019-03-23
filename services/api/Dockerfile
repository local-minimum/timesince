FROM python:3.6
RUN pip install gunicorn
COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
WORKDIR /app
COPY app.py .
COPY timesinceapi ./timesinceapi
ENV GUNICORN_CMD_ARGS="--bind=0.0.0.0:5000 --log-level=info"
EXPOSE 5000
ENTRYPOINT ["gunicorn", "app:app"]

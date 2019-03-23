import os
import logging

from flask import Flask

from timesinceapi.api import register_api
from timesinceapi.gateway import Gateway
gunicorn_error_logger = logging.getLogger('gunicorn.error')
app = Flask('Time Since API')
while len(app.logger.handlers):
    h = app.logger.handlers[0]
    app.logger.removeHandler(h)
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)
app.secret_key = os.environ.get('TIMESINCE_SECRET', 'testenvironment')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/timesince'
gateway = Gateway(app)
register_api(app, gateway)

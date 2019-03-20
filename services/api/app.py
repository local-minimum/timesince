from flask import Flask
from timesinceapi.api import register_api
from timesinceapi.gateway import Gateway

app = Flask('Time Since API')
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/timesince'
gateway = Gateway(app)
register_api(app, gateway)

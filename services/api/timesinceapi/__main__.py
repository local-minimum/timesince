from flask import Flask
from .api import register_api
from .gateway import Gateway

app = Flask('Time Since API')
app.config['MONGO_URI'] = 'mongodb://localhost:27017/timesince'
gateway = Gateway(app)
register_api(app, gateway)
app.run()

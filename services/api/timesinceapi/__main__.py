from flask import Flask
from .api import register_api

app = Flask('Time Since API')
app.config['MONGO_URI'] = 'mongodb://localhost:27017/timesince'

register_api(app)
app.run()

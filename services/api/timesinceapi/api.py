import datetime as dt
from http import HTTPStatus

from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

from .timeutil import Since
from .inputalidators import User


def register_api(app: Flask) -> None:

    mongo = PyMongo(app)

    @app.route('/', methods=['GET'])
    def apiroot():
        abouts = mongo.db.about
        about = abouts.find_one({'id': 'apiroot'})
        pseudometric = 'came to visit'

        if not about:
            abouts.insert_one({'id': 'apiroot', 'time': dt.datetime.utcnow()})
            return jsonify({
                'message': 'Noone ever {} before'.format(pseudometric),
                'value': None,
                'unit': None,
            }), HTTPStatus.OK

        abouts.update_one(
            {'id': 'apiroot'}, {'$set': {'time': dt.datetime.utcnow()}},
        )
        since = Since(about['time'])
        return jsonify(dict({
            'message': '{} since someone {}'.format(since, pseudometric),
        }, **since.todict())), HTTPStatus.OK

    @app.route('/login', methods=['POST'])
    def login():
        usr = User.from_request_data(request.get_json())
        users = mongo.db.users
        user = users.find_one({'name': usr.name})
        if user:
            if bcrypt.checkpw(usr.password, user['password']):
                return jsonify(
                    {'message': '{} logged in'.format(username)},
                ), HTTPStatus.OK
        return (
            jsonify({'message': 'Invalid username & password combination'}),
            HTTPStatus.UNAUTHORIZED,
        )

    @app.route('/users', methods=['PUT'])
    def register_user():
        try:
            usr = User.from_request_data(request.get_json())
        except ValidationError:
            return (
                jsonify({'message': 'Bad password or username'}),
                HTTPStatus.UNAUTHORIZED,
            )
        if usr.name == usr.password:
            return (
                jsonify({'message': 'Bad password or username'}),
                HTTPStatus.UNAUTHORIZED,
            )

        users = mongo.db.users
        if users.find_one({'name': username}):
            return (
                jsonify({'message': 'Username already taken'}),
                HTTPStatus.UNAUTHORIZED,
            )
        hashpass = bcrypt.hashpw(password, bcrypt.gensalt())
        users.insert({'name': username, 'password': hashpass})
        return jsonify({'message': 'User "{}" created"'.format(username)}), OK

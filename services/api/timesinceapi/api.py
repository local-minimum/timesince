import datetime as dt
from http import HTTPStatus

from flask import Flask, jsonify, request
from flask_login import (
    LoginManager, logout_user, login_user, current_user, login_required,
)

from .timeutil import Since
from .inputalidators import RequestUser
from .gateway import validate_user


def register_api(app: Flask, gateway: Gateway) -> None:

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return gateway.get_user_session(user_id)

    @app.route('/', methods=['GET'])
    def apiroot():
        pseudometric = 'came to visit'
        since = gateway.root_visits()
        if not since:
            return jsonify({
                'message': 'Noone ever {} before'.format(pseudometric),
                'value': None,
                'unit': None,
            }), HTTPStatus.OK
        return jsonify(dict({
            'message': '{} since someone {}'.format(since, pseudometric),
        }, **since.todict())), HTTPStatus.OK

    @app.route('/login', methods=['POST'])
    def login():
        user_request = UserRequest.from_request_data(request.get_json())
        user = gateway.validate_user(user_request)
        if user:
            login_user(user)
            return jsonify(
                {'message': '{} logged in'.format(user_request.name)},
            ), HTTPStatus.OK
        return (
            jsonify({'message': 'Invalid username & password combination'}),
            HTTPStatus.UNAUTHORIZED,
        )

    @app.route('/logout', methods=['POST'])
    @login_required
    def logout():
        name = current_user.name
        gateway.remove_session(current_user)
        logout_user()
        return jsonify(
            {'message': '{} logged out'.format(name)},
        ), HTTPStatus.OK

    @app.route('/users', methods=['PUT'])
    def register_user():
        try:
            userrequest = UserRequest.from_request_data(request.get_json())
        except ValidationError:
            return (
                jsonify({'message': 'Bad password or username'}),
                HTTPStatus.UNAUTHORIZED,
            )
        if not gateway.register_user(userrequest):
            if gateway.exists_user(userrequest.name):
                return (
                    jsonify({'message': 'Username already taken'}),
                    HTTPStatus.UNAUTHORIZED,
                )

            return (
                jsonify({'message': 'Bad password or username'}),
                HTTPStatus.UNAUTHORIZED,
            )
        return jsonify(
            {'message': 'User "{}" created"'.format(userrequest.name)},
        ), OK

    @app.route('/timers', methods=['GET'])
    @login_required
    def get_timers(self):
        return jsonify({
            'timers': list(gateway.get_user_timers(current_user))
        }), HTTPStatus.OK

    @app.route('/timers', methods=['PUT'])
    @login_required
    def create_timer(self):
        json = request.get_json()
        if not json or not json.get('title'):
            return jsonify({'message': 'Missing title'}), HTTPStatus.BADREQUEST
        return jsonify(
            gateway.create_timer(
                current_user, json['title'], bool(json.get('ithappendnow'])),
            ),
        ), HTTPStatus.OK

    @app.route('/timers/{timerid}/observe', methods=['PUT'])
    def record_event(self, timerid):
        return gateway.record_event(current_user, timerid)

    @app.route('/publictimers/{publishedid}', methods=['GET'])
    def get_public_timer(self, published):
        timer = gateway.get_public_timer(publishedid)
        if not timer:
            return jsonify({}), HTTPStatus.NOTFOUND
        return jsonify(timer), HTTPStatus.OK

    @app.route('/publictimers}', methods=['GET'])
    def get_public_timers(self):
        return jsonify({
            'timers': list(gateway.get_listed_public_timers(current_user))
        }), HTTPStatus.OK

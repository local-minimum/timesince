from http import HTTPStatus
from typing import Optional

from flask import Flask, jsonify, request
from flask_login import (
    LoginManager, logout_user, login_user, current_user, login_required
)

from .timeutil import Since
from .inputvalidators import RequestUser, ValidationError
from .gateway import Gateway, TimeSinceUser


def register_api(app: Flask, gateway: Gateway) -> None:

    login_manager: LoginManager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(access_token: str) -> Optional[TimeSinceUser]:
        user = gateway.get_user_session(access_token)
        if not user:
            app.logger.info("No user found for token {}".format(access_token))
        return user

    @app.route('/', methods=['GET'])
    def apiroot():
        since_visit = gateway.root_visits()
        since_register = gateway.registration_timer()
        return jsonify({
            'feed': [
                since_visit.todict(),
                since_register.todict(),
            ],
        }), HTTPStatus.OK

    @app.route('/ping', methods=['GET'])
    def ping():
        return jsonify({'message': 'pong'}), HTTPStatus.OK

    @app.route('/login', methods=['POST'])
    def login():
        user_request = RequestUser.from_request_data(
            request.get_json(), validate=False,
        )
        user = gateway.validate_user(user_request)
        if user:
            login_user(user)
            return jsonify(
                {'name': user.name}
            ), HTTPStatus.OK

        app.logger.warning("Failed logging in to {}".format(
            user_request.name,
        ))
        return (
            jsonify({'message': 'Invalid username & password combination'}),
            HTTPStatus.UNAUTHORIZED,
        )

    @app.route('/logout', methods=['POST'])
    @login_required
    def logout():
        name = current_user.name
        gateway.remove_user_session(current_user)
        logout_user()
        return jsonify(
            {'message': '{} logged out'.format(name)},
        ), HTTPStatus.OK

    @app.route('/users', methods=['PUT'])
    def register_user():
        try:
            userrequest = RequestUser.from_request_data(request.get_json())
        except ValidationError:
            app.logger.info("Failed to validate user on request {}".format(
                request.get_json(),
            ))
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
            {'message': 'User "{}" created'.format(userrequest.name)},
        ), HTTPStatus.OK

    @app.route('/user', methods=['Get'])
    @login_required
    def get_current_user():
        user = current_user
        return jsonify({'name': user.name}), HTTPStatus.OK

    @app.route('/timers', methods=['GET'])
    @login_required
    def get_timers():
        user = current_user
        return jsonify({
            'feed': list(since.todict() for since in gateway.get_user_timers(user))
        }), HTTPStatus.OK

    @app.route('/timers', methods=['PUT'])
    @login_required
    def create_timer():
        json = request.get_json()
        user = current_user
        if not json or not json.get('title'):
            return jsonify({'message': 'Missing title'}), HTTPStatus.BADREQUEST
        gateway.create_timer(
            user,
            json['title'],
            bool(json.get('ithappendnow', False)),
        )
        return jsonify({'message': 'Timer created'}), HTTPStatus.OK

    @app.route('/timers/<timerid>', methods=['PUT'])
    @login_required
    def record_event(timerid):
        user = current_user
        return jsonify(
            gateway.record_event(user, timerid).todict(),
        ), HTTPStatus.OK

    @app.route('/publictimers/<publishedid>', methods=['GET'])
    def get_public_timer(publishedid):
        since = gateway.get_public_timer(publishedid)
        if not since:
            return jsonify({}), HTTPStatus.NOTFOUND
        return jsonify(since.todict()), HTTPStatus.OK

    @app.route('/publictimers', methods=['GET'])
    def get_public_timers():
        user = current_user
        return jsonify({
            'feed': list(since.todist() for since in gateway.get_listed_public_timers(user)),
        }), HTTPStatus.OK

import datetime as dt
from uuid import uuid4
from typing import Optional, Iterable, List

import bcrypt
from flask_pymongo import PyMongo, ObjectId
from flask_login import UserMixin

from .inputvalidators import RequestUser
from .timeutil import Since


class TimeSinceUser(UserMixin):
    def __init__(self, name, access_token=None):
        super().__init__()
        self._access_token = (
            access_token if access_token is not None
            else str(uuid4().int + hash(name))
        )
        self._name = name

    @property
    def name(self):
        return self._name

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        """Activated account"""
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return self._access_token

    def __str__(self):
        return '<TimeSinceUser {} (access token {})>'.format(
            self._name, self._access_token,
        )


class Gateway:
    def __init__(self, app):
        self._mongo = PyMongo(app)

    def validate_user(self, userrequest: RequestUser) -> Optional[TimeSinceUser]:
        users = self._mongo.db.users
        userrecord = users.find_one({'name': userrequest.name})
        if userrecord:
            if bcrypt.checkpw(userrequest.password.encode('utf8'), userrecord['password']):
                user = TimeSinceUser(userrequest.name)
                users.update_one(
                    {'_id': userrecord['_id']},
                    {'$set': {
                        'accessToken': user.get_id(),
                        'loginDate': dt.datetime.utcnow(),
                    }},
                )
                return user
        return None

    def get_user_session(self, access_token) -> Optional[TimeSinceUser]:
        users = self._mongo.db.users
        filt = {'accessToken': access_token}
        if users.count(filt) == 1:
            userrecord = users.find_one(filt)
            if userrecord:
                return TimeSinceUser(userrecord['name'], access_token=access_token)
        return None

    def remove_user_session(self, user: TimeSinceUser) -> None:
        users = self._mongo.db.users
        userid = self.get_userid(user)
        users.update_one(
            {'_id': userid},
            {'$set': {'accessToken': None}},
        )

    def register_user(self, userrequest: RequestUser) -> Optional[TimeSinceUser]:
        if userrequest.name == userrequest.password:
            return None

        users = self._mongo.db.users
        if users.find_one({'name': userrequest.name}):
            return None
        hashpass = bcrypt.hashpw(userrequest.password.encode('utf8'), bcrypt.gensalt())
        user = TimeSinceUser(userrequest.name)
        users.insert({
            'name': userrequest.name,
            'password': hashpass,
            'email': userrequest.email,
            'registrationDate': dt.datetime.utcnow(),
            'accessToken': user.get_id(),
        })
        return user

    def exists_user(self, username: str) -> bool:
        users = self._mongo.db.users
        if users.find_one({'name': username}):
            return True
        return False

    def get_userid(self, user: TimeSinceUser) -> ObjectId:
        users = self._mongo.db.users
        record = users.find_one({'accessToken': user.get_id()})
        return record['_id']

    def root_visits(self) -> Since:
        abouts = self._mongo.db.about
        about = abouts.find_one({'id': 'apiroot'})
        pseudometric = 'came to visit'

        if not about:
            abouts.insert_one({'id': 'apiroot', 'time': dt.datetime.utcnow()})
            return Since('Someone came to visit')

        abouts.update_one(
            {'id': 'apiroot'}, {'$set': {'time': dt.datetime.utcnow()}},
        )
        return Since('Someone came to visit', [about['time']])

    def registration_timer(self) -> Since:
        users = self._mongo.db.users
        dates: List[dt.datetime] = sorted(
            [
                rec.get('registrationDate') for rec
                in users.find({}, {'_id': 0, 'registrationDate': 1})
                if rec.get('registrationDate')
            ]
        )
        return Since('Our communit grew', dates)

    def get_user_timers(self, user: TimeSinceUser) -> Iterable[Since]:
        timers = self._mongo.db.timers
        userid = self.get_userid(user)
        for timerrecord in timers.find({'userid': userid}):
            yield Since.from_record(timerrecord)

    def get_public_timer(self, publishedid: str) -> Optional[Since]:
        timers = self._mongo.db.timers
        if not publishedid:
            return None
        record = timers.find_one({'publishedid': publishedid})
        if record:
            return Since.from_record(record)
        return None

    def get_listed_public_timers(self) -> Iterable[Since]:
        timers = self._mongo.db.timers
        for record in timers.find({'publishedid': {'$gt': ''}, 'listed': True}):
            yield Since.from_record(record)

    def create_timer(self, user: TimeSinceUser, title: str, ithappendnow: bool) -> Since:
        timers = self._mongo.db.timers
        userid = self.get_userid(user)
        record = {
            'title': title,
            'userid': userid,
            'events': [dt.datetime.utcnow()] if ithappendnow else [],
            'publishedid': None,
            'listed': False,
        }
        result = timers.insert_one(record)
        return Since.from_record(dict(record, **{'_id': result.inserted_id}))

    def record_event(self, user: TimeSinceUser, timerid: str) -> Since:
        timers = self._mongo.db.timers
        oid = ObjectId(timerid)
        userid = self.user_id(user)
        timers.update_one(
            {'_id': oid, 'userid': userid},
            {'$push': {'events': dt.datetime.utcnow()}},
        )
        record = timers.find_one({'_id': oid})
        return Since.from_record(record)

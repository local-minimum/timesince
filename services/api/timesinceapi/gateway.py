import datetime as dt
from uuid import uuid4
from typing import Optional, Iterable

import attr
import bcrypt
from flask_pymongo import PyMongo, ObjectId

from .inputvalidators import RequestUser
from .timeutil import Since


class User:
    def __init__(self, name, session_id=None):
        self._id = session_id if session_id is not None else str(uuid4().int + hash(name))
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

    @property
    def session_id(self):
        return self._id

    def get_id(self):
        pass

    def __str__(self):
        return '<User {} (id {})>'.format(self._name, self._id)


@attr.s(frozen=True)
class Timer:
    timerid = attr.ib(metadata={'record_name': '_id'})
    title = attr.ib(metadata={'record_name': 'title'})
    most_recent = attr.ib(metadata={
        'generated': lambda record: Since(record.get('events', [None])[-1]),
    })
    events = attr.ib(default=[], metadata={'record_name': 'events'})
    publishedid = attr.ib(
        default=None, metadata={'record_name': 'publishedid'},
    )

    @classmethod
    def from_record(cls, record) -> "Timer":
        params = {}
        for attribute in attr.fields(cls):
            generated = attribute.metadata.get('generated')
            record_name = attribute.metadata.get('record_name')
            if generated:
                params[attribute.name] = generated(record)
            elif record_name:
                params[attribute.name] = record.get(record_name)
        return cls(**params)


class Gateway:
    def __init__(self, app):
        self._mongo = PyMongo(app)

    def validate_user(self, userrequest: RequestUser) -> Optional[User]:
        users = self._mongo.db.users
        userrecord = users.find_one({'name': userrequest.name})
        if userrecord:
            if bcrypt.checkpw(userrequest.password.encode('utf8'), userrecord['password']):
                user = User(userrequest.name)
                users.update_one(
                    {'_id': userrecord['_id']},
                    {'$set': {'session': user.session_id}},
                )
                return user
        return None

    def get_user_session(self, session_id) -> Optional[User]:
        users = self._mongo.db.users
        filt = {'session': session_id}
        if users.count(filt) == 1:
            userrecord = users.find_one(filt)
            if userrecord:
                return User(userrecord['name'], session=session_id)
        return None

    def remove_user_session(self, user: User) -> None:
        users = self._mongo.db.users
        userid = self.get_userid(user)
        users.update_one(
            {'_id': userid},
            {'$set': {'session': None}},
        )

    def register_user(self, userrequest: RequestUser) -> Optional[User]:
        if userrequest.name == userrequest.password:
            return None

        users = self._mongo.db.users
        if users.find_one({'name': userrequest.name}):
            return None
        hashpass = bcrypt.hashpw(userrequest.password.encode('utf8'), bcrypt.gensalt())
        user = User(userrequest.name)
        users.insert({
            'name': userrequest.name, 'password': hashpass,
            'session': user.session_id,
        })
        return user

    def exists_user(self, username: str) -> bool:
        users = self._mongo.db.users
        if users.find_one({'name': username}):
            return True
        return False

    def get_userid(self, user: User) -> ObjectId:
        users = self._mongo.db.users
        record = users.find_one({'session': user.session_id})
        return record['_id']

    def root_visits(self) -> Optional[Since]:
        abouts = self._mongo.db.about
        about = abouts.find_one({'id': 'apiroot'})
        pseudometric = 'came to visit'

        if not about:
            abouts.insert_one({'id': 'apiroot', 'time': dt.datetime.utcnow()})
            return None

        abouts.update_one(
            {'id': 'apiroot'}, {'$set': {'time': dt.datetime.utcnow()}},
        )
        return Since(about['time'])

    def get_user_timers(self, user: User) -> Iterable[Timer]:
        timers = self._mongo.db.timers
        userid = self.get_userid(user)
        for timerrecord in timers.find({'userid': userid}):
            yield Timer.from_record(timerrecord)

    def get_public_timer(self, publishedid: str) -> Optional[Timer]:
        timers = self._mongo.db.timers
        if not publishedid:
            return None
        record = timers.find_one({'publishedid': publishedid})
        if record:
            return Timer.from_record(record)
        return None

    def get_listed_public_timers(self) -> Iterable[Timer]:
        timers = self._mongo.db.timers
        for record in timers.find({'publishedid': {'$gt': ''}, 'listed': True}):
            yield Timer.from_record(record)

    def create_timer(self, user: User, title: str, ithappendnow: bool) -> Timer:
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
        return Timer.from_record(dict(record, **{'_id': result.inserted_id}))

    def record_event(self, user: User, timerid: str) -> Timer:
        timers = self._mongo.db.timers
        oid = ObjectId(timerid)
        userid = self.user_id(user)
        timers.update_one(
            {'_id': oid, 'userid': userid},
            {'$push': {'events': dt.datetime.utcnow()}},
        )
        record = timers.find_one({'_id': oid})
        return Timer.from_record(record)

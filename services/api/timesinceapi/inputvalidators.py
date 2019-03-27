import attr
import re


class ValidationError(Exception):
    pass

def validname(name) -> bool:
    if len(name) < 1:
        raise ValidationError("Username too short")

def validpassword(pwd) -> bool:
    complexity = set(c for c in pwd)
    if len(pwd) <= 8:
        raise ValidationError("Password too short")
    if len(complexity) < 4:
        raise ValidationError("Password too simple")


def validemail(email) -> bool:
    if not email:
        return
    if not re.match(r'^[^@ /,]+@[^@ /,.]+\.[^@ /]+$', email):
        raise ValidationError("Invalid email")


def username_and_password_similar(user: "RequestUser") -> bool:
    return (
        user.name in user.password
        and len(user.name) / len(user.password) > 0.5
    )


@attr.s(frozen=True)
class RequestUser:
    name = attr.ib(
        metadata={
            'json_name': 'user',
            'validator': validname,
        },
    )
    password = attr.ib(
        metadata={
            'json_name': 'password',
            'validator': validpassword,
        }
    )
    email = attr.ib(
        metadata={
            'json_name': 'email',
            'validator': validemail,
        },
        default=None,
    )

    @classmethod
    def from_request_data(cls, requestdata, validate: bool=True) -> "RequestUser":
        if requestdata is None:
            raise ValidationError()
        params = {}
        for attribute in attr.fields(RequestUser):
            json_name = attribute.metadata.get('json_name')
            validator = attribute.metadata.get('validator')
            if json_name and json_name in requestdata:
                value = requestdata[json_name]
                if validate and validator:
                    validator(value)

                params[attribute.name] = value

        try:
            return cls(**params)
        except (AttributeError, TypeError):
            raise ValidationError('Missing required user data')

import attr
import re


class ValidationError(Exception):
    pass


def validpassword(pwd) -> bool:
    complexity = set(c for c in pwd)
    return len(pwd) > 8 and len(complexity) > 5


def validemail(email) -> bool:
    if not email:
        return True
    return re.match(r'^[^@ /,]+@[^@ /,.]+\.[^@ /]+$', email) is not None


@attr.s(frozen=True)
class RequestUser:
    name = attr.ib(
        metadata={
            'json_name': 'user',
            'validator': lambda name: len(name),
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
        }
    )

    @classmethod
    def from_request_data(cls, requestdata) -> "RequestUser":
        if requestdata is None:
            raise ValidationError()
        params = {}
        for attribute in attr.fields(RequestUser):
            json_name = attribute.metadata.get('json_name')
            validator = attribute.metadata.get('validator')
            if json_name and json_name in requestdata:
                value = requestdata[json_name]
                if validator and not validator(value):
                    raise ValidationError()

                params[attribute.name] = value

        try:
            return cls(**params)
        except AttributeError:
            raise ValidationError()

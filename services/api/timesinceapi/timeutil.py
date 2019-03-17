import datetime as dt
from typing import Dict, Any, Optional


class Since:
    def __init__(self, when: Optional[dt.datetime]) -> None:
        if when is None:
            self._value = None
            self._unit = 'never'
            return
        seconds = (dt.datetime.utcnow() - when).total_seconds()
        if seconds > 60:
            minutes = seconds / 60.

            if minutes > 60:
                hours = minutes / 60.

                if hours >= 48:
                    days = hours / 24
                    self._value = int(days)
                    self._unit = 'days'

                else:
                    self._value = int(hours)
                    self._unit = 'hours' if self._value != 1 else 'hour'
            else:
                self._value = int(minutes)
                self._unit = 'minutes' if self._value != 1 else 'minute'
        else:
            self._value = int(seconds)
            self._unit = 'seconds' if self._value != 1 else 'second'

    @property
    def value(self) -> Optional[int]:
        return self._value

    @property
    def unit(self) -> str:
        return self._unit

    def __str__(self) -> str:
        return "{} {}".format(self.value, self.unit)

    def todict(self) -> Dict[str, Any]:
        return {'value': self.value, 'unit': self.unit}

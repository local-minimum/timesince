import datetime as dt
from typing import Dict, Any, Optional, List


class Since:
    def __init__(self, title: str, when: Optional[List[dt.datetime]]) -> None:
        self._history = when
        self._title = title
        if not when:
            self._value = None
            self._unit = 'never'
            return

        most_recent = when[-1]
        seconds = (dt.datetime.utcnow() - most_recent).total_seconds()
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
    def title(self) -> str:
        return self._title

    @property
    def value(self) -> Optional[int]:
        return self._value

    @property
    def unit(self) -> str:
        return self._unit

    @property
    def history(self) -> str:
        return self._history

    def __str__(self) -> str:
        return "{} {}".format(self.value, self.unit)

    def todict(self) -> Dict[str, Any]:
        return {
            'history': self.history,
            'title': self.title,
            'value': self.value,
            'unit': self.unit,
        }

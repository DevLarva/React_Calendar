import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import GlobalContext from "../context/GlobalContext";
import axios from 'axios';

dayjs.extend(isBetween);

export default function Day({ day, rowIdx }) {
  const { filteredEvents, setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = dayjs().year();
        const response = await axios.get(`${year}/KR`);
        setHolidays(response.data.map(holiday => dayjs(holiday.date)));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  useEffect(() => {
    if (day) {
      const allEvents = filteredEvents.filter(
        (evt) => dayjs(day).isBetween(dayjs(evt.startDate), dayjs(evt.endDate), 'day', '[]')
      );

      const overlappingSameDurationEvents = allEvents.filter((evt, idx, self) =>
        self.some((otherEvt) =>
          evt !== otherEvt &&
          dayjs(evt.startDate).isSame(dayjs(otherEvt.startDate), 'day') &&
          dayjs(evt.endDate).isSame(dayjs(otherEvt.endDate), 'day')
        )
      );

      overlappingSameDurationEvents.sort((a, b) => {
        const aStart = dayjs(a.startDate);
        const bStart = dayjs(b.startDate);
        return aStart.isBefore(bStart) ? -1 : 1;
      });

      const singleDayEvents = allEvents.filter(
        (evt) => dayjs(evt.startDate).isSame(dayjs(evt.endDate), 'day')
      );

      const multiDayEvents = allEvents
        .filter(
          (evt) =>
            !dayjs(evt.startDate).isSame(dayjs(evt.endDate), 'day') &&
            !overlappingSameDurationEvents.includes(evt)
        )
        .sort((a, b) => {
          const aDuration = dayjs(a.endDate).diff(dayjs(a.startDate), 'day');
          const bDuration = dayjs(b.endDate).diff(dayjs(b.startDate), 'day');
          return bDuration - aDuration;
        });

      setDayEvents([...overlappingSameDurationEvents, ...multiDayEvents, ...singleDayEvents]);
    }
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day && day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  function getHolidayClass() {
    return holidays.some(holiday => dayjs(day).isSame(holiday, 'day'))
      ? 'bg-red-600 text-white rounded-full w-7'
      : '';
  }

  function getEventPositionClass(evt) {
    const isStartDay = day && dayjs(day).isSame(dayjs(evt.startDate), 'day');
    const isEndDay = day && dayjs(day).isSame(dayjs(evt.endDate), 'day');
    const isSingleDay = isStartDay && isEndDay;

    if (isSingleDay) {
      return 'rounded-full px-1 py-1.5';
    } else if (isStartDay) {
      return 'rounded-l-lg px-2 py-1';
    } else if (isEndDay) {
      return 'rounded-r-lg px-2 py-1';
    } else {
      return 'rounded-none px-2 py-1';
    }
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && day && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        {day && (
          <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()} ${getHolidayClass()}`}>
            {day.format('DD')}
          </p>
        )}
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 text-gray-600 text-sm mb-2 truncate ${getEventPositionClass(evt)}`}
            style={{
              marginRight: dayjs(day).isSame(dayjs(evt.endDate), 'day') ? '2px' : '0',
              paddingRight: dayjs(day).isSame(dayjs(evt.endDate), 'day') ? '10px' : '2px',
              width: 'calc(100% + 2px)',
            }}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

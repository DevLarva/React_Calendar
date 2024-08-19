import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import GlobalContext from "../context/GlobalContext";

dayjs.extend(isBetween);

export default function Day({ day, rowIdx }) {
  const { filteredEvents, setDaySelected, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(day).isBetween(dayjs(evt.startDate), dayjs(evt.endDate), 'day', '[]')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
  }

  function getEventPositionClass(evt) {
    const isStartDay = dayjs(day).isSame(dayjs(evt.startDate), 'day');
    const isEndDay = dayjs(day).isSame(dayjs(evt.endDate), 'day');
    const isSingleDay = isStartDay && isEndDay;

    if (isSingleDay) {
      return 'rounded-lg';  // 모든 모서리가 약간 둥근 사각형
    } else if (isStartDay) {
      return 'rounded-l-lg'; // 왼쪽 모서리가 둥근 사각형
    } else if (isEndDay) {
      return 'rounded-r-lg'; // 오른쪽 모서리가 둥근 사각형
    } else {
      return 'rounded-none'; // 모서리 둥근 모양 없음 (직각 사각형)
    }
  }


  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
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
            className={`bg-${evt.label}-200 p-1.5 text-gray-600 text-sm mb-2 truncate ${getEventPositionClass(evt)}`}
            style={{
              marginRight: dayjs(day).isSame(dayjs(evt.endDate), 'day') ? '2px' : '0',
              paddingLeft: '2px',
              paddingRight: '2px',
              width: 'calc(100% + 2px)',  // 이 부분은 스타일이 균일하게 채워지도록 합니다.
            }}
          >
            {evt.title}
          </div>

        ))}
      </div>
    </div>
  );
}

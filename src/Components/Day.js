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
    // 공휴일 API에서 데이터를 가져오는 함수
    const fetchHolidays = async () => {
      try {
        const year = dayjs().year();
        console.log("연도:", year)
        const response = await axios.get(`https://date.nager.at/Api/v2/PublicHolidays/${year}/KR`);
        setHolidays(response.data.map(holiday => dayjs(holiday.date)));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);


  useEffect(() => {
    if (day) {
      //기본
      const allEvents = filteredEvents.filter(
        (evt) => dayjs(day).isBetween(dayjs(evt.startDate), dayjs(evt.endDate), 'day', '[]')
      );
      //단일
      const singleDayEvents = allEvents.filter(
        (evt) => dayjs(evt.startDate).isSame(dayjs(evt.endDate), 'day')
      );
      //다중
      const multiDayEvents = allEvents.filter(
        (evt) => !dayjs(evt.startDate).isSame(dayjs(evt.endDate), 'day')
      );
      setDayEvents([...multiDayEvents, ...singleDayEvents]);
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
      return 'rounded-full px-1 py-1.5';  // 모든 모서리가 둥글고 추가 패딩
    } else if (isStartDay) {
      return 'rounded-l-lg px-2 py-1'; // 왼쪽 모서리가 둥글고 패딩 추가
    } else if (isEndDay) {
      return 'rounded-r-lg px-2 py-1'; // 오른쪽 모서리가 둥글고 패딩 추가
    } else {
      return 'rounded-none px-2 py-1'; // 모서리 둥근 모양 없음, 패딩 추가
    }
  }

  if (loading) return <p>...</p>;
  if (error) return <p>Error 관리자에게 문의 {error.message}</p>;

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
              marginRight: day && dayjs(day).isSame(dayjs(evt.endDate), 'day') ? '2px' : '0',
              paddingRight: dayjs(day).isSame(dayjs(evt.endDate), 'day') ? '10px' : '2px', // 조건에 따라 패딩 설정
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



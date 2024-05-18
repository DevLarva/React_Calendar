import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export default function Calendar() {
    const { savedEvents, daySelected } = useContext(GlobalContext);

    function getEventsForDay(day) {
        return savedEvents.filter(event => 
            day.isBetween(dayjs(event.startDate), dayjs(event.endDate), 'day', '[]')
        );
    }

    const startDay = daySelected.startOf('month').day();
    const daysInMonth = daySelected.daysInMonth();

    return (
        <div className="grid grid-cols-7">
            {/* 빈 셀 채우기 */}
            {Array.from({ length: startDay }).map((_, index) => (
                <div key={index} className="border p-2"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                const day = daySelected.startOf('month').add(dayIndex, 'day');
                const events = getEventsForDay(day);

                return (
                    <div key={dayIndex} className="border p-2">
                        <p>{day.format('D')}</p>
                        {events.map(event => (
                            <span 
                                key={event.id} 
                                className={`bg-${event.label}-500 p-1 rounded block`}
                                style={{ 
                                    gridColumnStart: dayIndex + startDay + 1, 
                                    gridColumnEnd: `span ${dayjs(event.endDate).diff(dayjs(event.startDate), 'day') + 1}`
                                }}
                            >
                                {event.title}
                            </span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
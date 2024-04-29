import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function Day({day, rowIdx}) {
    const [dayEvents, setDayEvents] = useState([])
    const {setDaySelected, setShowEventModal, savedEvents}  = useContext(GlobalContext)
    
    useEffect(()=>{
        const events = savedEvents.filter(
        (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
      setDayEvents(events)
    }, [savedEvents, day]);
    

    function getCurrentDayclass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")  ? 'bg-blue-600 text-white rounded-full w-7' : ''
    }
    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                )}
              <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}`}>
                {day.format('DD')}</p>
            </header>
            <div className="flex-1 cursor-pointer" onClick={() =>{
                setDaySelected(day);
                setShowEventModal(true);
            }}>
                {dayEvents.map((evt,idx) => (
                    <div key ={idx}
                    className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}



//`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}` 백틱사용
// 백틱 사용 방법 영어 상태일때 ESC 밑에 있는거! ''작은 따옴표랑은 다름
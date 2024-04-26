import React, { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function Day({day, rowIdx}) {
    function getCurrentDayclass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")  ? 'bg-blue-600 text-white rounded-full w-7' : ''
    }
    const {setDaySelected, setShowEventModal}  = useContext(GlobalContext)
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
                {""}
            </div>
        </div>
    );
}



//`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}` 백틱사용
// 백틱 사용 방법 영어 상태일때 ESC 밑에 있는거! ''작은 따옴표랑은 다름
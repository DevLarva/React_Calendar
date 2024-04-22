import React from "react";
import dayjs from "dayjs";

export default function Day({day, rowIdx}) {
    function getCurrentDayclass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")  ? 'bg-blue-600 text-white rounded-full w-7' : ''
    }
    return (
        <div className="boder border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
                )}
              <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}`}>
                {day.format('DD')}</p>
            </header>
        </div>
    );
}



//`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}` 백틱사용
// 백틱 사용 방법 영어 상태일때 ESC 밑에 있는거 
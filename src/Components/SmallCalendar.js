import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from "../util";
import GlobalContext from '../context/GlobalContext';

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month()); // currentMonthIdx 상태를 선언하고 초기값으로 현재 달의 인덱스를 설정.
    const [currentMonth, setCurrentMonth] = useState(getMonth()); // currentMonth 상태를 선언하고 초기값으로 현재 달의 데이터를 설정.


    useEffect(() => {   // useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 currentMonthIdx가 변경될 때 실행.
        setCurrentMonth(getMonth(currentMonthIdx))  //currentMonth를 현재 달의 데이터로 업데이트.
    }, [currentMonthIdx]) // currentMonthIdx가 변경될 때만 실행.

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext)
    // GlobalContext에서 필요한 상태와 함수들을 가져옴.

    useEffect(() => {   // monthIndex가 변경될 때 실행.
        setCurrentMonthIdx(monthIndex); // currentMonthIdx를 monthIndex와 동기화.
    }, [monthIndex]);   //monthIndex가 변경될 때만 실행.

    function handlePrevMonth() {    //이전 달로 이동하는 함수
        setCurrentMonthIdx(currentMonthIdx - 1)
    }

    function handleNextMonth() {    //이후 달로 이동하는 함수
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    function getDayClass(day) {
        const format = "DD-MM-YY"   //날짜 형식을 정의.
        const nowDay = dayjs().format(format)   // 현재 날짜를 지정된 형식으로 포맷.
        const currDay = day.format(format)  // 현재 날짜 데이터를 지정된 형식으로 포맷.
        const slcDay = daySelected && daySelected.format(format)    // 선택된 날짜가 있을 경우 해당 날짜를 지정된 형식으로 포맷.

        if (nowDay === currDay) { // 만약 현재날짜와 현재 순회중인 날짜가 같다면
            return 'bg-blue-500 rounded-full text-white';   //요 스탈로
        } else if (currDay === slcDay) {     // 그게 아니라 현재날짜와 선택된 날짜가 같다면 
            return "bg-blue-100 rounded-full text-blue-600 font-bold"   //요 강조 스탈로
        } else {
            return "";  // 아니면 기본 스타일로
        }
    }

    return (
        <div className="mt-9">
            <header className="flex justify-between">
                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
                </p>
                <button onClick={handlePrevMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        chevron_left
                    </span>
                </button>

                <button onClick={handleNextMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                        chevron_right
                    </span>
                </button>

            </header>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, i) => (   // 현재 달의 첫 번째 주를 순회하면서 각 요일을 나타내는 루프.
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => ( //현재 달의 각 주를 순회하면서 각 날짜를 나타내는 루프.
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx} //고유한 키 지정.
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day)
                                }}
                                className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className="text-sm">
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

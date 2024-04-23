import React, { useContext } from "react";
import logo from '../assets/logo.png'
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import 'dayjs/locale/ko'
dayjs.locale('ko')


export default function CalendarHeaders() {
        const {monthIndex, setMonthIndex} = useContext(GlobalContext);
        function handlePrevMonth() {
            setMonthIndex(monthIndex -1);
        }
        function handleNextMonth() {
            setMonthIndex(monthIndex +1);
        }
        function handleReset() {
            setMonthIndex(dayjs().month())
        }
    return (
        <header className="px-4 py2 flex items-center">
            <img src= {logo} alt="calendar" className="mr-2 w-12 h-12"/>
            <h1 className="mr-10 tex-xl text-gray-500 fond-bold">
                달력
            </h1>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
                오늘
            </button>
            <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2" >
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
        </header>
    )
}

// dayjs 한글 적용하기 아래 링크 참고
// https://ordinary-code.tistory.com/155
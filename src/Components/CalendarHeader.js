import React from "react";
import logo from '../assets/logo.png'



export default function CalendarHeaders() {
    return (
        <header className="px-4 py2 flex items-center">
            <img src= {logo} alt="calendar" className="mr-2 w-12 h-12"/>
            <h1 className="mr-10 tex-xl text-gray-500 fond-bold">
                달력
            </h1>
            <button className="border rounded py-2 px-4 mr-5">
                오늘
            </button>
            <button>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_left
                </span>
            </button>
            <button>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                    chevron_right
                </span>
            </button>
        </header>
    )
}
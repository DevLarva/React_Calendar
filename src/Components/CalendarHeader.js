import React, { useContext } from "react";
import Andnlogo from "../assets/andnlogo.png"
import GlobalContext from "../context/GlobalContext";  //전역 콘텍스트 가져오기
import dayjs from "dayjs";
import 'dayjs/locale/ko' //dayjs에서 한글을 사용하기 위해 한국어 설정 불러오기
dayjs.locale('ko')


// 캘린더 헤더 컴포넌트 정의
export default function CalendarHeaders() {
        // 전역 컨텍스트에서 monthIndex와 setMonthIndex를 가져옴.
        const {monthIndex, setMonthIndex} = useContext(GlobalContext);
        

        //이전 달 이동 함수
        function handlePrevMonth() {    
            setMonthIndex(monthIndex -1);
        }
        //다음 달 이동 함수
        function handleNextMonth() {
            setMonthIndex(monthIndex +1);
        }
        //오늘 날짜로 이동하는 함수
        function handleReset() {
            // 만약 monthIndex가 현재 월과 같다면 무작위로 monthIndex를 조정.
            // 그렇지 않다면 현재 월로 설정.
            setMonthIndex(monthIndex === dayjs().month() 
            ? monthIndex + Math.random()
            : dayjs().month())
        }

        function handleRefresh() {
            window.location.reload();
        }
    // 캘린더 헤더 
    return (
        <header className="px-4 py2 flex items-center">
            <div className="flex items-center cursor-pointer" onClick={handleRefresh}>
            <img 
                    src={Andnlogo} 
                    alt="And N" 
                    className="mr-2 h-10 mt-2 mb-2" //이미지 크기 수정 css
                    style={{ filter: 'invert(1)' }} // 이미지 색상을 반전시키는 스타일 적용
                />
            </div>
            {/* 이전 달로 이동하는 버튼을 렌더링. */}
            <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2" >
                    chevron_left
                </span>
            </button>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 ml-5">
                오늘
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
// 헤더 부분 추후 수정 필요(Done)
// TODO:헤더 이미지 수정 필요 
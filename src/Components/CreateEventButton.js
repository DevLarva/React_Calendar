import React, { useContext } from 'react'
import plusImg from '../assets/plusImg.png'
import GlobalContext from '../context/GlobalContext';
export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext) //전역 콘텍스트에서 setShowEventModal 함수를 가져옴.
  return ( 
  <button
    onClick={()=> setShowEventModal(true)} //클릭 시 setShowEventModal을 호출해서 이벤트 모달을 표시.
    className='border p-2 rounded-full flex item-center shadow-md hover:shadow-2xl' //버튼 css
    > 
    <img src={plusImg} alt= "이벤트 생성" className="w-7 h-7" /> {/* 이미지 요소를 추가합니다. */}
    <span className="pl-3 pr-7"> 
        일정 추가
    </span>
  </button>
  );
}

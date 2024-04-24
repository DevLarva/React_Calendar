import React from 'react'
import plusImg from '../assets/plusImg.png'
export default function CreateEventButton() {
  return ( <button className='border p-2 rounded-full flex item-center shadow-md hover:shadow-2xl'>
    <img src={plusImg} alt= "이벤트 생성" className="w-7 h-7" />
    <span className="pl-3 pr-7"> 
        일정 추가
    </span>
  </button>
  );
}

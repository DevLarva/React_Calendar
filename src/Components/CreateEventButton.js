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


// useContext란?
// 이전에 Context가 무엇인지를 알고 가야하는데.
// 공식 문서에 따르면 context를 이용하면 단계마다 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공 할 수 있다고 한다.
// context API를 사용하기 위해서는 Provider , Consumer , createContext 이렇게 세가지 개념을 알고 있으면 된다.

// createContext : context 객체를 생성한다.
// Provider : 생성한 context를 하위 컴포넌트에게 전달하는 역할을 한다.
// Consumer : context의 변화를 감시하는 컴포넌트이다.

// 그럼 이제 useContext란 무엇인가?
// useContext는 위에서 언급한 context를 좀더 편하게 사용할 수 있도록 도와주는 hook이다.
import React from "react";

//이것도 아래 링크 참고
//React의 createContext 함수를 사용하여 GlobalContext라는 콘텍스트를 생성하고 있다.
//이 콘텍스트는 애플리케이션 전체에서 상태와 함수를 공유하는 데 사용, 초기 상태 값과 해당 값을 설정하는 함수들이 포함됩니다.

const GlobalContext = React.createContext({
    monthIndex: 0, // 현재 월의 인덱스를 저장합니다.
    setMonthIndex: (index) => { }, // 월 인덱스를 설정하는 함수입니다.
    smallCalendarMonth: 0, // 작은 캘린더의 월을 저장합니다.
    setSmallCalendarMonth: (index) => { }, // 작은 캘린더의 월을 설정하는 함수입니다.
    daySelected: null, // 선택된 날짜를 저장합니다.
    setDaySelected: (day) => { }, // 선택된 날짜를 설정하는 함수입니다.
    showEventModal: false, // 이벤트 모달의 표시 여부를 저장합니다.
    setShowEventModal: () => { }, // 이벤트 모달의 표시 여부를 설정하는 함수입니다.
    dispatchCalEvent: ({ type, payload }) => { }, // 이벤트를 관리하는 함수입니다.
    savedEvents: [], // 저장된 이벤트들을 저장합니다.
    selectedEvent: null, // 선택된 이벤트를 저장합니다.
    setSelectedEvent: () => { }, // 선택된 이벤트를 설정하는 함수입니다.
    setLabels: () => { }, // 라벨을 설정하는 함수입니다.
    labels: [], // 라벨들을 저장합니다.
    updateLabel: () => { }, // 라벨을 업데이트하는 함수입니다.
    filteredEvents: [], // 필터링된 이벤트들을 저장합니다.
});

export default GlobalContext;


// 참고 링크 (https://ko.legacy.reactjs.org/docs/context.html#reactcreatecontext)
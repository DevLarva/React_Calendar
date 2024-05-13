import React, {useState, useEffect, useReducer, useMemo} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, {type, payload}) {
    switch (type) {
        case "push":
            return [...state, payload];  // 새로운 이벤트를 추가 (...의 의미는 아래에서)
        case "update":
            return state.map((evt) => evt.id === payload.id ? payload : evt);   //특정 이벤트 업데이트
        case "delete":
            return state.filter((evt) => evt.id !== payload.id); //특정 이벤트 삭제
        default:
            throw new Error();  //유효하지 않은 액션 타입이 들어왔을때 에러 발생
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents');  //로컬 저장소에서 이벤트 가져옴
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];    // JSON 형식 패싱
    return parsedEvents; //초기 이벤트 반환
}
export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());  //현재 월의 인덱스 저장 및 설정
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null); // 작은 캘린더의 월을 저장 및 설정
    const [daySelected, setDaySelected] = useState(dayjs());    // 선택된 날짜를 저장
    const [showEventModal, setShowEventModal] = useState(false);    // 이벤트 모달 표시 여부를 저장
    const [selectedEvent, setSelectedEvent] = useState(null);   // 선택된 이벤트 저장
    const [labels, setLabels] = useState([])    // 라벨 상태를 저장
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [],initEvents);  //이벤트를 관리하는 리듀서(자세한 사항은 아래에서)

     // 필터링된 이벤트를 메모이제이션. (메모이제이션? 아래에서)
    const filteredEvents = useMemo(() => {
        return savedEvents.filter(evt => labels.filter(lbl => lbl.checked)
        .map(lbl => lbl.label).includes(evt.label)
        );
    }, [savedEvents, labels])

    // 이벤트가 변경될 때 로컬 저장소에 저장.
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents])

    // 이벤트가 변경될 때 라벨을 설정.
    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set( savedEvents.map(evt => evt.label))].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label);
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                };
            });
        });
    }, [savedEvents]);

    // 작은 캘린더의 월이 변경될 때 월 인덱스를 업데이트.
    useEffect(() => {
        if(smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    },[smallCalendarMonth])

    // 이벤트 모달이 닫힐 때 선택된 이벤트 초기화.    
    useEffect(() => {
        if(!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal])

    // 라벨을 업데이트하는 함수.
    function updateLabel(label) {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }
    
    //참고 자료(https://ko.legacy.reactjs.org/docs/context.html#when-to-use-context)
    //Context 오브젝트에 포함된 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할.
    return (
        <GlobalContext.Provider
         value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            labels,
            setLabels,
            updateLabel,
            filteredEvents
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

/*
// ...함수 닷닷닷 함수는 배열 앞에 ...를 붙이면 변수 배열 안에 요소를 쉽게 넣을 수 있다.
// 예시) const food = ['마라탕', '치킨', '불닭볶음면'];
        const  juice = '공차';
    이 두개를 합친다고 했을때 [juice, food] 라고 하면 뿜된다.
    그래서 필요한게 [juice, ...food] 라고 하면 배열안에 쏙 들어간다.

// 리듀서? 리듀서는 할 일을 정의하는 Action,애플리케이션의 모든 데이터를 저장하는 State,
 Action과 State를 받아 새 상태를 리턴하는 Reducer를 포함한다.

// 메모이제이션: 메모이제이션은 컴퓨터가 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로서 동일한 계산을 하지 않도록해
속도를 높이는 기술. 대부분 애플리케이션의 최적화를 위해 사용. 위 코드에서는 useMemo를 사용하였지만 그 외에도 React.memo, useCallback이 있다.
*/
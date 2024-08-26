import React, { useState, useEffect, useReducer, useMemo, createContext } from "react";
import dayjs from "dayjs";
import { call } from '../Components/ApiService';

// GlobalContext를 생성합니다.
const GlobalContext = createContext({
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

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((evt) => evt.id === payload.id ? payload : evt);
        case "delete":
            return state.filter((evt) => evt.id !== payload.id);
        case "set":
            return payload;
        default:
            throw new Error();
    }
}

export const GlobalContextProvider = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, []);

    function updateLabel(label) {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl));
    }

    const filteredEvents = useMemo(() => {
        return savedEvents.filter(evt => labels.filter(lbl => lbl.checked)
            .map(lbl => lbl.label).includes(evt.label)
        );
    }, [savedEvents, labels]);

    useEffect(() => {
        call("/api/andnCalendar/todo", "GET")
            .then(response => {
                dispatchCalEvent({ type: "set", payload: response });
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    useEffect(() => {
        setLabels((prevLabels) => {
            const uniqueLabels = [...new Set(savedEvents.map(evt => evt.label))];
            return uniqueLabels.map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label);
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                };
            });
        });
    }, [savedEvents]);

    const addEvent = (event) => {
        call("/api/andnCalendar/todo", "POST", event)
            .then(response => {
                dispatchCalEvent({ type: "push", payload: response });
            })
            .catch(error => console.error('Error adding event:', error));
    };

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
                filteredEvents,
                addEvent
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;

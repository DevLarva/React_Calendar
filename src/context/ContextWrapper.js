import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { call } from '../Components/ApiService';

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((evt) => evt.id === payload.id ? payload : evt);
        case "delete":
            return state.filter((evt) => evt.id !== payload.id);
        case "set":
            return payload; // Sets the entire events array
        default:
            throw new Error();
    }
}

export default function ContextWrapper(props) {
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
        // Fetch and set events
        call("/api/andnCalendar/todo", "GET")
            .then(response => {
                dispatchCalEvent({ type: "set", payload: response });
                console.log("Fetched events:", response);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []); // Execute only once when the component mounts

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    // useEffect(() => {
    //     localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    // }, [savedEvents]);

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
            {props.children}
        </GlobalContext.Provider>
    );
}


//TODO: 본인이 쓴 일정 본인만 삭제 가능하게 했으면 좋겠다.(노션 피드백 1차 배포 결과 참고)
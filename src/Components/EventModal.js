import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
import { call } from './ApiService';

const labelsClasses = [   //색상 추가(6/1)
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "gray",
  "pink",
  "cyan"
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
  );
  const [startDate, setStartDate] = useState(
    selectedEvent ? dayjs(selectedEvent.startDate).format("YYYY-MM-DD") : daySelected.format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    selectedEvent ? dayjs(selectedEvent.endDate).format("YYYY-MM-DD") : daySelected.format("YYYY-MM-DD")
  );

  const add = (item) => {
    call("/api/andnCalendar/todo", "POST", item)
      .then(response => {
        dispatchCalEvent({ type: "push", payload: response });
      })
      .catch(error => console.error("There was an error adding the item!", error));
  };

  const update = (item) => {
    call(`/api/andnCalendar/todo/${item.id}`, "PATCH", item)
      .then(response => {
        dispatchCalEvent({ type: "update", payload: response });
      })
      .catch(error => console.error("There was an error updating the item!", error));
  };

  const deleteItem = (item) => {
    call(`/api/andnCalendar/todo/${item.id}`, "DELETE")
      .then(() => {
        // 서버에서 삭제가 성공하면, 클라이언트 상태도 업데이트
        dispatchCalEvent({ type: "delete", payload: item });
        setShowEventModal(false);
      })
      .catch(error => console.error("There was an error deleting the item!", error));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      id: selectedEvent ? selectedEvent.id : null,
      title,
      description,
      label: selectedLabel,
      startDate: new Date(startDate).toISOString().replace('Z', '+00:00'),
      endDate: new Date(endDate).toISOString().replace('Z', '+00:00'),
    };

    if (selectedEvent) {
      update(calendarEvent);
    } else {
      add(calendarEvent);
    }

    setShowEventModal(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"> {/* 화면 전체를 덮는 모달 */}
      <form className="bg-white rounded-lg shadow-2xl w-1/4"> {/* 모달의 스타일링 */}
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center"> {/* 모달 헤더 */}
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent }); // 이벤트 삭제
                  deleteItem(selectedEvent);
                  console.log("Delete item id:", update.call.id);
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer">
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}> {/* 모달 닫기 버튼 */}
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="제목"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}  // 제목 입력 필드
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM D일")}</p> {/* 선택된 날짜 표시 */}
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="내용을 추가해주세요"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}  // 설명 입력 필드
            />
            <span className="material-icons-outlined text-gray-400 self-start">
              bookmark_border
            </span>
            <div className="grid grid-cols-5 gap-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}> {/* 라벨 선택 */}
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
            <span className="material-icons-outlined text-gray-400">
              today
            </span>
            <input
              type="date"
              name="startDate"
              value={startDate}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setStartDate(e.target.value)}  // 시작 날짜 입력 필드
            />
            <span className="material-icons-outlined text-gray-400">
              event
            </span>
            <input
              type="date"
              name="endDate"
              value={endDate}
              className="pt-3 border-0 text-gray-600 pb-2 w-full sborder-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEndDate(e.target.value)}  // 종료 날짜 입력 필드
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            저장 {/* 저장 버튼 */}
          </button>
        </footer>
      </form>
    </div>
  );
}



//TODO: 색상 수 늘리기 (노션 피드백 1차 배포 결과 참고)
//ERROR: 삭제하고 나서 새로고침하면 계속 삭제한게 출력
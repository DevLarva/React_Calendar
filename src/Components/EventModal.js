import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
import { call } from './ApiService';
import { jwtDecode } from 'jwt-decode'; // jwt-decode 임포트
import { getToken } from '../../src/auth'; // 토큰 가져오는 함수

const labelsClasses = [
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

  const [isOwner, setIsOwner] = useState(false);
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

  useEffect(() => {
    const fetchUserId = () => {
      const token = getToken();
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentUserId = decodedToken.sub;

        // selectedEvent가 존재하면 수정 모드
        if (selectedEvent && String(selectedEvent.author) === String(currentUserId) || decodedToken.role == "ROLE_MANAGER") {
          setIsOwner(true);
        } else if (selectedEvent) {
          setIsOwner(false);
        }
      }
    };

    fetchUserId();
  }, [selectedEvent]);

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
        dispatchCalEvent({ type: "delete", payload: item });
      })
      .catch(error => console.error("There was an error deleting the item!", error));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedEvent && !isOwner) return; // 수정 모드에서 소유자가 아니면 아무 작업도 하지 않음

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

  useEffect(() => {
    console.log("isOwner 상태 값:", isOwner);
  }, [isOwner]);

  const isEditMode = Boolean(selectedEvent); // 편집 모드인지 여부 확인

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {isEditMode && isOwner && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  deleteItem(selectedEvent);
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer">
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
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
              disabled={isEditMode && !isOwner}  // 수정 모드에서 소유자가 아니면 필드 비활성화
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM D일")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="내용을 추가해주세요"
              value={description}
              required
              disabled={isEditMode && !isOwner}  // 수정 모드에서 소유자가 아니면 필드 비활성화
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400 self-start">
              bookmark_border
            </span>
            <div className="grid grid-cols-5 gap-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => (isEditMode && isOwner) ? setSelectedLabel(lblClass) : !isEditMode && setSelectedLabel(lblClass)}  // 수정 모드에서 소유자가 아니면 클릭 불가능
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
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
              disabled={isEditMode && !isOwner}  // 수정 모드에서 소유자가 아니면 필드 비활성화
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              event
            </span>
            <input
              type="date"
              name="endDate"
              value={endDate}
              disabled={isEditMode && !isOwner}  // 수정 모드에서 소유자가 아니면 필드 비활성화
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`px-6 py-2 rounded text-white ${isEditMode && !isOwner ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isEditMode && !isOwner}  // 수정 모드에서 소유자가 아니면 버튼 비활성화
          >
            저장
          </button>
        </footer>
      </form>
    </div>
  );
}



//TODO: 색상 수 늘리기 (노션 피드백 1차 배포 결과 참고)
//ERROR: 삭제하고 나서 새로고침하면 계속 삭제한게 출력
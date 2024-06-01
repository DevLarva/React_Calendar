// import React, { useContext, useState } from 'react'
// import GlobalContext from '../context/GlobalContext'  //전역 콘텍스트

// const labelsClasses = [   //라벨 색상 배열 정의
//   "indigo",
//   "gray",
//   "green",
//   "blue",
//   "red",
//   "purple",
// ];  

// export default function EventModal() {
//     const {
//       setShowEventModal,  //모달 닫는 함수
//       daySelected,        // 선택된 날의 정보
//       dispatchCalEvent,   // 캘린더 이벤트를 업데이트하는 함수
//       selectedEvent       // 선택된 이벤트의 정보
//     }  = useContext(GlobalContext); //전역 상태 불러옴.

    

//     const [title, setTitle] = useState(
//       selectedEvent ? selectedEvent.title : ""
//     );  //이벤트 제목 상태를 정의하고, 선택된 이벤트가 있으면 그 제목으로 초기화

//     const [description, setDescription] = useState(
//       selectedEvent ? selectedEvent.description : ""
//     );  //이벤트 설명 상태를 정의하고, 선택된 이벤트가 있으면 그 설명으로 초기화

//     const [selectedLabel, setSelectedLabel] = useState(
//       selectedEvent ? labelsClasses.find((lbl) => 
//       lbl === selectedEvent.label) : labelsClasses[0]
//     );  //선택된 라벨 상태 정의, 선택된 이벤트가 있으면 그 라벨로 초기화
    

//     function handleSubmit(e) {
//       e.preventDefault()  //폼 제출시 페이지 리로드 방지.
//       const calendarEvent = {
//         title,
//         description,
//         label: selectedLabel,
//         day: daySelected.valueOf(), //valueOf는 특정 객체의 원시 값을 반환하는것. 
//         id: selectedEvent ? selectedEvent.id : Date.now(),  //이벤트 ID를 설정.
//       };
//       if(selectedEvent) {
//         dispatchCalEvent({type: "update", payload: calendarEvent });  //기존 이벤트 업데이트.
//       } else {
//         dispatchCalEvent({type: "push", payload: calendarEvent });  //새로운 이벤트 추가.
//       }
      
//       setShowEventModal(false); //모달 닫기
//     }
    
//   return (
//     <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
//       <form className="bg-white rounded-lg shadow-2xl w-1/4">
//         <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
//             <span className="material-icons-outlined text-gray-400">
//                 drag_handle
//             </span>
//             <div>
//               {selectedEvent && (
//                  <span 
//                  onClick={() => {
//                   dispatchCalEvent({type: "delete", payload: selectedEvent}); // 이벤트를 삭제합니다.
//                   setShowEventModal(false);
//                 }} 
//                  className="material-icons-outlined text-gray-400 cursor-pointer">
//                  delete
//                 </span>
//               )}
//             <button onClick={() => setShowEventModal(false)}>
//                 <span className="material-icons-outlined text-gray-400">
//                     close
//                 </span>
//             </button>
//             </div>
       
//         </header>
//         <div className="p-3">
//             <div className="grid grid-cols-1/5 items-end gap-y-7">
//                 <div></div>
//                     <input type="text"
//                      name="title"
//                      placeholder="제목"
//                      value={title}
//                      required
//                      className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
//                      onChange={(e) => setTitle(e.target.value)} 
//                     />
//             <span className="material-icons-outlined text-gray-400">
//                 schedule
//             </span>
//             <p>{daySelected.format("dddd, MMMM D일")}</p>
            
//             <span className="material-icons-outlined text-gray-400">
//                 segment
//             </span>
//             <input type="text"
//                      name="내용"
//                      placeholder="내용을 추가해주세요"
//                      value={description}
//                      required
//                      className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
//                      onChange={(e) => setDescription(e.target.value)} 
//             />
//             <span className="material-icons-outlined text-gray-400">
//                 bookmark_border
//             </span>
//             <div className="flex gap-x-2">
//             {labelsClasses.map((lblClass, i) => (
//                 <span key={i} onClick={() => setSelectedLabel(lblClass) }
//                 className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
//                   {selectedLabel === lblClass && <span className="material-icons-outlined text-white text-sm">
//                     check
//                   </span>
//                   }
//                 </span>
//               ) )}
//             </div>
//           </div>
//         </div>
//         <footer className="flex justify-end border-t p-3 mt-5">
//           <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
//               저장
//           </button>
//         </footer>
//       </form>
//     </div>
//   );
// }



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
  "teal",
  "olive"
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
        dispatchCalEvent({ type: "delete", payload: item });
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
                <span className="material-icons-outlined text-gray-400">
                  bookmark_border
                </span>
                <div className="flex gap-x-2">
                  {labelsClasses.map((lblClass, i) => (
                    <span 
                      key={i} 
                      onClick={() => setSelectedLabel(lblClass) }
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
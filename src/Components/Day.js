// import React, { useContext, useEffect, useState } from "react";
// import dayjs from "dayjs";
// import GlobalContext from "../context/GlobalContext";

// export default function Day({day, rowIdx}) {
//     // dayEvents 상태를 선언 및 초기화
//     const [dayEvents, setDayEvents] = useState([]) 
//     //전역 컨텍스트에서 필요한 값 가져옴
//     const {setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent}  = useContext(GlobalContext)
 

//     // 컴포넌트가 렌더링될 때 필요한 이벤트들을 필터링하여 설정
//     useEffect(()=>{
//         const events = filteredEvents.filter(
//         (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
//     );
//       setDayEvents(events)
//     }, [filteredEvents, day]);
    
//     // 현재 날짜에 해당하는 클래스를 반환하는 함수를 정의
//     function getCurrentDayclass() {
//         return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")  ? 'bg-blue-600 text-white rounded-full w-7' : ''
//     }
//     return (
//         <div className="border border-gray-200 flex flex-col">
//             <header className="flex flex-col items-center">
//                 {/* rowIdx가 0일 경우에만 요일을 표시. */}
//                 {rowIdx === 0 && (
//                     <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
//                 )}
//                 {/* 현재 날짜에 해당하는 클래스를 사용하여 날짜를 표시. */}
//               <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}`}>
//                 {day.format('DD')}</p>

//             </header>
//                 {/* 이벤트 목록을 표시하는 부분. */}
//             <div className="flex-1 cursor-pointer" onClick={() =>{
//                 setDaySelected(day);
//                 setShowEventModal(true);
//             }}>
//                  {/* 이벤트 목록을 매핑하여 렌더링. */}
//                 {dayEvents.map((evt,idx) => (
//                     <div key ={idx}
//                     onClick={() =>setSelectedEvent(evt)}
//                     className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
//                         {evt.title}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }




//`text-sm p-1 my-1 text-center  ${getCurrentDayclass()}` 백틱사용
// 백틱 사용 방법 영어 상태일때 ESC 밑에 있는거! ''작은 따옴표랑은 다름import React, { useContext } from 'react';


// import dayjs from 'dayjs';
// import GlobalContext from '../context/GlobalContext';
// import isBetween from 'dayjs/plugin/isBetween';

// dayjs.extend(isBetween); // isBetween 플러그인을 dayjs에 등록

// export default function Day({ day, rowIdx }) {
//   const { savedEvents, setShowEventModal, setSelectedEvent } = useContext(GlobalContext);

//   function getCurrentDayClass() {
//     return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : '';
//   }

//   function getEventsForDay(day) {
//     return savedEvents.filter(event => 
//       day.isBetween(dayjs(event.startDate), dayjs(event.endDate), 'day', '[]')
//     );
//   }

//   const events = getEventsForDay(day);

//   return (
//     <div className="border border-gray-200 flex flex-col">
//       <header className="flex flex-col items-center">
//         {rowIdx === 0 && (
//           <p className="text-sm mt-1">
//             {day.format('ddd').toUpperCase()}
//           </p>
//         )}
//         <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
//           {day.format('DD')}
//         </p>
//       </header>
//       <div 
//         className="flex-1 cursor-pointer"
//         onClick={() => {
//           setSelectedEvent(null);
//           setShowEventModal(true);
//         }}
//       >
//         {events.map((event, idx) => (
//           <div
//             key={idx}
//             className={`bg-${event.label}-500 p-1 mr-3 text-white text-sm rounded mb-1 truncate`}
//             onClick={() => {
//               setSelectedEvent(event);
//               setShowEventModal(true);
//             }}
//           >
//             {event.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween); // isBetween 플러그인을 dayjs에 등록

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  // 컴포넌트가 렌더링될 때 필요한 이벤트들을 필터링하여 설정
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(day).isBetween(dayjs(evt.startDate), dayjs(evt.endDate), 'day', '[]')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  // 현재 날짜에 해당하는 클래스를 반환하는 함수를 정의
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* rowIdx가 0일 경우에만 요일을 표시 */}
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        {/* 현재 날짜에 해당하는 클래스를 사용하여 날짜를 표시 */}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      {/* 이벤트 목록을 표시하는 부분 */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {/* 이벤트 목록을 매핑하여 렌더링 */}
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

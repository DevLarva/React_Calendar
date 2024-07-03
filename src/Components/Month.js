import React from 'react';
import Day from './Day';

export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">  {/* 그리드를 나타내는 div 요소를 정의 */}
      {month.map((row, i) => (      // month 배열을 순회하면서 각 행을 나타내는 루프.
        <React.Fragment key={i}>    {/* React.Fragment를 사용하여 각 행을 감싸고, 고유한 키 prop을 부여 */}
          {row.map((day, idx) => (     // 각 행(row)을 구성하는 요소를 순회하면서 각 날짜를 나타내는 루프.
            <Day day={day} key={idx} rowIdx={i} />  // Day 컴포넌트를 렌더링. day와 rowIdx prop을 전달하고, 고유한 키 prop을 부여.
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}


// Fragment? 
// React의 일반적인 패턴은 컴포넌트가 여러개의 요소를 반환하는 것. 
// Fragments를 사용하면 DOM에 별도 노드를 추가하지 않고 자식 목록을 그룹화할 수 있다.
// 굳이 <React.Fragment> </React.Fragment> 라고 하지 않고 <> </>으로도 사용 가능.
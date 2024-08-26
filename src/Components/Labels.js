import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Labels() {
    const { labels, updateLabel } = useContext(GlobalContext);  // GlobalContext에서 labels와 updateLabel을 가져옴.
    const [isOpen, setIsOpen] = useState(true); // 필터 목록의 접기/펼치기 상태를 관리하는 상태 변수

    const toggleFilter = () => {
        setIsOpen(!isOpen); // 토글 버튼 클릭 시, 상태를 반전시킴 (펼치기 <-> 접기)
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-between mt-10">
                <p className="text-gray-500 font-bold">필터</p>
                <button
                    onClick={toggleFilter} // 버튼 클릭 시 토글 기능 실행
                    className="text-gray-500 font-normal focus:outline-none"
                >
                    {isOpen ? '접기 ▲' : '펼치기 ▼'} {/* 상태에 따라 버튼 텍스트 변경 */}
                </button>
            </div>
            {isOpen && ( // isOpen 상태에 따라 필터 목록을 표시하거나 숨김
                <div className="mt-3">
                    {labels.map(({ label: lbl, checked }, idx) => ( // labels 배열을 순회하며 각 라벨을 표시합니다.
                        <label key={idx} className="items-center block mt-3">  {/* 라벨을 표시하기 위한 레이블을 설정합니다. */}
                            <input
                                type="checkbox" // 체크박스
                                checked={checked} // 현재 라벨의 체크 여부를 반영.
                                onChange={() => updateLabel({ label: lbl, checked: !checked })}   // 체크 상태 변경 시 updateLabel 함수를 호출해 상태 업데이트
                                className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}    // 체크박스의 스타일 설정
                            />
                            <span className="ml-2 text-gray-700 capitalize">
                                {lbl}  {/* 라벨 이름을 표시합니다. */}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </React.Fragment>
    );
}




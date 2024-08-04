import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export default function Labels() {
    const { labels, display, updateLabel } = useContext(GlobalContext);  // GlobalContext에서 labels와 updateLabel을 가져옴.
    return (
        <React.Fragment>
            <p className="text-gray-500 font-bold mt-10">
                필터
            </p>
            {labels.map(({ label: lbl, display, checked }, idx) => ( // labels 배열을 순회하며 각 라벨을 표시합니다.
                <label key={idx} className="items-center mt-3 block">  {/* 라벨을 표시하기 위한 레이블을 설정합니다. */}
                    <input
                        type="checkbox" //체크박스
                        checked={checked} //현재 라벨의 체크 여부를 반영.
                        onChange={() => updateLabel({ label: lbl, checked: !checked })}   //체크 상태 변경시 updateLabel 함수를 호출해 상태 업데이트
                        className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}    //체크박스의 스타일 설정
                    />
                    <span className="ml-2 text-gray-700 capitalize">
                        {lbl}  {/* 라벨 이름을 표시합니다. */}
                    </span>
                </label>
            ))}
        </React.Fragment>
    );
}





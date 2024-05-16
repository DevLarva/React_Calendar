import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {     //월별 날짜를 가져오는 함수를 선언. 매개변수로 기본값은 현재 월을 사용
    month = Math.floor(month)   //month 변수를 정수로 변환.
    const year = dayjs().year();    // 현재 연도를 가져옴.
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()    //해당 월의 첫번째 날의 요일을 가져옴.
    let currenMonthCount = 0 - firstDayOfTheMonth   //해당 월의 첫번째 주의 시작일 설정.
    const daysMatrix = new Array(5).fill([]).map(() => {    //5개의 요일 행을 가진 배열을 생성하고, 각 요일을 채움.
        return new Array(7).fill(null).map(() => {  //7일간의 날짜를 가진 배열을 생성하고 각 날짜를 생성.
            currenMonthCount++  //현재 월의 날짜를 증가.
            return dayjs(new Date(year, month, currenMonthCount))   //해당 날짜의 dayjs 객체를 생성하여 반환.
        })
    })
    return daysMatrix   //월별 날짜를 담은 이차원 배열을 반환.
}


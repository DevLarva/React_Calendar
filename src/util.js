import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month)
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
    let currenMonthCount = 0 - firstDayOfTheMonth
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currenMonthCount++
            return dayjs(new Date(year, month, currenMonthCount))
        })
    })
    return daysMatrix
}


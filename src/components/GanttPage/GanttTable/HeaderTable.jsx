import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import styles from '../Gantt.module.css'

const HeaderTable = ({ dateInterval }) => {
  const [month, setMonth] = useState([])
  const [days, setDays] = useState([])
  const [daysInMonth, setDaysInMonth] = useState()


  useEffect(() => {
    if (dateInterval !== null) {
      intervalMonth(dateInterval)
      setArrDays(dateInterval)

    }
  }, [dateInterval])

  const intervalMonth = (dateInterval) => {
    var startM = dateInterval.start.$M
    var endM = dateInterval.end.$M

    var arr = []
    while (startM <= endM) {
      arr.push(dayjs().month(startM).format('MMMM'))
      startM++
    }
    setMonth(arr)
  }

  const setArrDays = (dateInterval) => {
    var countDays = dateInterval.end.diff(dateInterval.start, 'day') + 1;

    const arr = []
    const arrDays = []
    var count = 0;
    var counDayInMonth = 0;


    while (count < countDays) {
      var day = dayjs(dateInterval.start).add(count, 'd').$D
      arr.push(day)
      if (counDayInMonth != 0 && day == 1) {
        arrDays.push(counDayInMonth)
        counDayInMonth = 0;
      }
      counDayInMonth++;
      count++;
    }
    if (counDayInMonth != 0) {
      arrDays.push(counDayInMonth)
    }
    setDays(arr)
    setDaysInMonth(arrDays)
  }

  let tableMonth = month.map((item, i) => {
    return <td className={styles.th02} colSpan={daysInMonth[i]} key={i}>{item}</td>
  })
  let tableDays = days.map((item, i) => {
    return <td className={styles.table01} key={i}>{item}</td>
  })

  return (
    <thead>
      <tr>
        <td className={styles.th01} rowSpan={2}>
          Контрагент
        </td>
        <td className={styles.th01} rowSpan={2}>
          Сотрудник
        </td>
        <td className={styles.th01} rowSpan={2}>
          Приоритет
        </td>
        {tableMonth}
      </tr>
      <tr>
        {tableDays}
      </tr>
    </thead>
  )
}

export default HeaderTable
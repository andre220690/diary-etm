import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const BodyTable = ({ data, dateInterval}) => {
    const [header, setHeader] = useState([])

    useEffect(()=>{
        if(dateInterval!=null){
            var arr = []
        data.map(item =>{
            var x = {
                before: dateInterval.start.diff(dayjs(item.dateStart, "DD.MM.YYYY"), 'day'),
                task: dayjs(item.dateStart, "DD.MM.YYYY").diff(dayjs(item.dateEnd, "DD.MM.YYYY"), 'day'),
                after: dayjs(item.dateEnd, "DD.MM.YYYY").diff(dateInterval.end, 'day')
            }
            arr.push(x)
        })
        console.log(arr)
        }
        

    },[dateInterval])



    let task = data.map((item, i) => {
        return <tr key={item.id}>
            <td>
                {item.partner}
            </td>
            <td>
                {item.user}
            </td>
            <td>
                {item.priority}
            </td>
        </tr>
    })

    return (
        <tbody>
            {task}
        </tbody>
    )
}

export default BodyTable
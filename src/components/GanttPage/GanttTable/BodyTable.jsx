import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import TaskLine from './TaskLine'
import styles from '../Gantt.module.css'
import { Numbers } from '@mui/icons-material'

const BodyTable = ({ data, dateInterval }) => {
    const [header, setHeader] = useState([])
    const [location, setLocation] = useState()

    useEffect(() => {
        if (dateInterval != null) {
            var arr = []
            data.map(item => {
                arr.push({
                    before: dayjs(item.dateStart, "DD.MM.YYYY").diff(dateInterval.start, 'day'),
                    task: dayjs(item.dateEnd, "DD.MM.YYYY").diff(dayjs(item.dateStart, "DD.MM.YYYY"), 'day')+1,
                    after: dateInterval.end.diff(dayjs(item.dateEnd, "DD.MM.YYYY"), 'day')
                })
            })
            console.log(arr)
            setLocation(arr)
        }
    }, [dateInterval])


    let task = data.map((item, i) => {
        if (location) {
            var min = location[i].task+location[i].before
            return <tr key={item.id} className={styles.tl02}>
                <td className={styles.th01}>
                    {item.partner}
                </td>
                <td className={styles.th01}>
                    {item.user}
                </td>
                <td className={styles.th01}>
                    {item.priority}
                </td>
                {location[i].before > 0
                    ? <td colSpan={location[i].before}></td>
                    : ''
                }
                {location[i].before < 0
                ?<td colSpan={location[i].task+location[i].before}><TaskLine item={item}/></td>
                :<td colSpan={location[i].task}><TaskLine item={item}/></td>
                }
                <td colSpan={location[i].after}></td>
            </tr>
        }

    })

    return (
        <tbody>
            {location
                ? task
                : ''
            }
        </tbody>
    )
}

export default BodyTable
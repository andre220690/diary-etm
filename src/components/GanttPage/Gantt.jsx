import React, { useEffect, useState } from 'react'
import TopMenu from '../TopMenu'
import GanttTable from './GanttTable/GanttTable'
import FilterTask from './FilterTask'
import Task from './Task'
import PostService from '../../Api/PostService'
import { DatePicker, DateTimePicker, dayPickerClasses } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

const example = [
    {
        id: 1,
        dateStart: "01.01.2023",
        dateEnd: "31.01.2023",
        partner: "ООО Восход",
        user: "Попов В.В.",
        userCode: 111111,
        priority: 1,
        description: "Заведение новой продукции в ассортимент клиента"
    },
    {
        id: 2,
        dateStart: "15.12.2022",
        dateEnd: "16.02.2023",
        partner: "ИП Пупкин Г.Н",
        user: "Попов В.В.",
        userCode: 111111,
        priority: 2,
        description: "Отгрузить клиента"
    }
]

const Gantt = () => {
    const [showMenuFilter, setShowMenuFilter] = useState(false)
    const [showNewTask, setShowNewTask] = useState(false)
    const [filtertData, setFilterData] = useState();

    const [dateInterval, setDateInterval] = useState(null)


    const buttons = [{
        name: 'Фильтр',
        action: () => { setShowMenuFilter(true) }
    },
    {
        name: 'Создать задачу',
        action: () => { setShowNewTask(true)}
    }];

    useEffect(() => {
        setDateInterval({
            start: dayjs('01/01/2023'),
            end: dayjs('03/03/2023')
          })

        //const response = PostService.getListTasks('01/12/2022', '01/04/2023');
        setFilterData(example)
    }, [])



    return (
        <div>
            {showMenuFilter
                ? <FilterTask setFilterData={setFilterData} setDateInterval={setDateInterval} setShowMenuFilter={setShowMenuFilter}/>
                : ''
            }
            {showNewTask
            ? <Task setShowTask={setShowNewTask}/>
            :''
            }
            <TopMenu buttons={buttons} />
            <GanttTable data={filtertData} dateInterval={dateInterval} />
        </div>
    )
}

export default Gantt
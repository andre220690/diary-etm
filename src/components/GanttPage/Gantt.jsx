import React, { useState } from 'react'
import TopMenu from '../TopMenu'
import GanttTable from './GanttTable/GanttTable'
import FilterTask from './FilterTask'
import Task from './Task'

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
import React, { Component } from 'react'
import TopMenu from '../TopMenu'

const Gantt = () => {

    const Filter=()=>{        
        //Открыть компонент фильтра
    }
    const AddTask=()=>{
        //открыть компонет задачи
    }

    const buttons = [{
        name: 'Фильтр',
        action: Filter
    },
    {
        name: 'Создать задачу',
        action: AddTask
    }];

    
        
    return (
        <div>
            <TopMenu buttons={buttons}/>
        </div>
    )
}

export default Gantt
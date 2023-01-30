import React from 'react'
import TopMenu from '../TopMenu'
import Board from './Board'

const Kanban = () => {

    const Filter=()=>{        
        //Открыть компонент фильтра
    }
    const AddStick=()=>{
        //открыть компонет задачи
    }
    const Save=()=>{
        //открыть компонет задачи
    }

    const buttons = [{
        name: 'Фильтр',
        action: Filter
    },
    {
        name: 'Добавить',
        action: AddStick
    },
    {
        name: 'Сохранить',
        action: Save
    }];


    const sample = 'to do|progress|dsadada|adddd|seccessfull'

    const sticks =[
        {
            id: 1,
            description: "начало",
            status: 0,
            isSeccessful: null
        },
        {
            id: 2,
            description: "прогресс",
            status: 1,
            isSeccessful: null
        },
        {
            id: 3,
            description: "начат",
            status: 0,
            isSeccessful: null
        },
        {
            id: 4,
            description: "начат",
            status: 2,
            isSeccessful: true
        } ,
        {
            id: 5,
            description: "начат",
            status: 2,
            isSeccessful: false
        }    
    ]





    
  return (
    <div>
        <TopMenu buttons={buttons}/>
        <Board sample={sample} sticks={sticks}/>
    </div>
  )
}

export default Kanban
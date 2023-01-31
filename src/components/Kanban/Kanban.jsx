import React, { useEffect, useState } from 'react'
import TopMenu from '../TopMenu'
import Board from './Board'
import PostService from '../../Api/PostService';
import { useToJson } from '../../hooks/useToJson';

const Kanban = () => {
    const [sticks, setStick] = useState([]);
    const [sample, setSample] = useState("");
    const [toJSON] = useToJson();

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



    const getSticks = async () => {
        const response = await PostService.getSticksOnExpress(localStorage.getItem("UserCode"));
        //var result = toJSON(response.data);
        setStick(response.data);

    }
    const getSample = async () => {
        const response = await PostService.getCanbanExpress();
        setSample(response.data);
    }

    useEffect(()=>{
        getSticks();        
        getSample();

        //setStick([
        //    {
        //        id: 1,
        //        description: "начало",
        //        status: 0,
        //        isSuccessful: null
        //    },
        //    {
        //        id: 2,
        //        description: "прогресс",
        //        status: 1,
        //        isSuccessful: null
        //    },
        //    {
        //        id: 3,
        //        description: "начат",
        //        status: 0,
        //        isSuccessful: null
        //    },
        //    {
        //        id: 4,
        //        description: "начат",
        //        status: 2,
        //        isSuccessful: true
        //    } ,
        //    {
        //        id: 5,
        //        description: "начат",
        //        status: 2,
        //        isSuccessful: false
        //    }    
        //]);
        //getSample('to do|progress|dsadada|adddd|seccessfull');

    },[])




    
  return (
    <div>
        <TopMenu buttons={buttons}/>
        {sample&&sticks
        ?<Board sample={sample} sticks={sticks}/>
        :<div/>
        }
    </div>
  )
}

export default Kanban
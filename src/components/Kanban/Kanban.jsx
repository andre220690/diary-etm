import React, { useEffect, useState } from 'react'
import TopMenu from '../TopMenu'
import Board from './Board'
import PostService from '../../Api/PostService';
import styles from './Kanban.module.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const Kanban = () => {
    const [sticks, setStick] = useState([]);
    const [sample, setSample] = useState();
    //const [data, setData] = useState();
    const [addSticks, setAddStick] = useState(false);

    const AddStick = () => {
        const [data, setData] = useState();

        const addStk = async () => {
            console.log(data)
            if(data){
                var obj = {
                    Description : data,
                    NameStatus : sample[0],
                    NumStatus : 0,
                    BoardId : 1,
                    UserCode : localStorage.getItem("UserCode")
                }
                console.log(obj)
                await PostService.postAddStick(obj)
            }
            setAddStick(false)
        }

        return (
            <div className={styles.outSide}>
                <div className={styles.knb01}>
                    <TextField                        
                        id="outlined-multiline-flexible"
                        label="Задача"
                        multiline
                        maxRows={4}
                        value={data} onChange={(e)=>setData(e.target.value)}
                    />
                    <Button style={{marginTop: '15px'}} onClick={addStk} variant='contained'>СОЗДАТЬ</Button>
                </div>
            </div>
        )
    }

    const buttons = [
    {
        name: 'Добавить',
        action: ()=>{setAddStick(true)}
    }];


    const getSticks = async () => {
        const response = await PostService.getSticksOnExpress(localStorage.getItem("UserCode"));
        setStick(response.data);
    }
    const getSample = async () => {
        const response = await PostService.getCanbanExpress();
        setSample(response.data);
    }

    useEffect(() => {
        getSticks();
        getSample();

    }, [])


    return (
        <div>
            <TopMenu buttons={buttons} />
            {sample && sticks.length
                ? <Board refrash={getSticks} sample={sample} sticks={sticks} />
                : <div />
            }
            {addSticks
                ? <AddStick />
                : <div />}
        </div>
    )
}

export default Kanban
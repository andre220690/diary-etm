import React, { useEffect, useState } from 'react'
import Board from '../Kanban/Board'
import PostService from '../../Api/PostService'
import styles from './Gantt.module.css'
import { Button } from '@mui/material'

const TaskBoard = ({ setShowBoard, idTask }) => {
  const [sticks, setSticks] = useState([])
  const [sample, setSample] = useState()

  useEffect(() => {
    getSticks()
    getSample()
  }, [])

  const getSticks = async () => {
    const response = await PostService.getSticksOnBoardTask(idTask)
    setSticks(response.data);
  }
  const getSample = async () => {
    console.log(idTask)
    const response = await PostService.getCanbanTask(idTask)
    setSample(response.data);
  }

  const addStick = () => {
    // добавление стика
  }

  return (
    <div className={styles.outSide}>
      <div className={styles.board01}>
        <Button style={{ marginTop: '15px', width: '100px' }} onClick={addStick} variant='contained'>СОЗДАТЬ</Button>
        {sample && sticks.length
          ? <Board sticks={sticks} sample={sample} />
          : ''
        }
      </div>
    </div>

  )
}

export default TaskBoard
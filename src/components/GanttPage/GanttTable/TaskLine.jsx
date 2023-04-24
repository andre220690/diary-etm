import React, { useState } from 'react'
import Task from '../Task'
import PostService from '../../../Api/PostService'
import styles from '../Gantt.module.css'

const TaskLine = ({ item }) => {
    const [dataTask, setDataTask] = useState()
    const [showTask, setShowTask] = useState(false);

    const getTask = async () => {
        var response = await PostService.getTask(item.id)
        setDataTask(response.data)
        setShowTask(true)
    }

    return (
        <div onClick={getTask} className={styles.tl01}>
            {item.description}
            {showTask
                ? <Task TaskId={dataTask.id} setShowTask={setShowTask}/>
                : ''
            }
        </div>
    )
}

export default TaskLine
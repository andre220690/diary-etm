import React, { useCallback, useEffect, useState } from 'react'
import styles from './Gantt.module.css'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, SnackbarContent } from '@mui/material';


const Story = ({setShowStory, TaskId}) => {
  const [message, setMessage] = useState('')
  const [story, setStory] = useState([])

  useEffect(()=>{
    getStory()
  },[])

  const getStory = useCallback(async()=> {
    const response = await PostService.getHistoryTask(TaskId)
    setStory(response.data)
  }, [TaskId])

  //const getStory = async () => {
  //  const response = await PostService.getHistoryTask(TaskId)
  //  setStory(response.data)
  //}

  const SaveMessage = async () => {
    if (message !== '') {
      await PostService.getAddHistory(TaskId, message)
      const response = PostService.getHistoryTask(TaskId)
      setStory(response.data)
    }
  }


  return (
    <div className={styles.outSide} onClick={(e)=> {setShowStory(false); e.stopPropagation()}}>
      <div className={styles.storyBoard} onClick={(e)=> e.stopPropagation()}>
        {story.length
          ?
          <Stack spacing={1} sx={{ maxWidth: 600 }}>
            {story.map((item, i)=>{
                <SnackbarContent key={i} message={item} />
            })}
          </Stack>

          : <div>Нет сообщений</div>
        }

        <TextField
          sx={{ width: '550px' }}
          id="outlined-multiline-flexible"
          label="Результат"
          multiline
          minRows={5}
          value={message} onChange={(e) => setMessage(e.target.value)}
        />
        <Button style={{ backgroundColor: '#FFD700', color: '#000000' }} onClick={() => SaveMessage()} variant='contained'>Сохранить</Button>


      </div>
    </div>
  )
}

export default Story
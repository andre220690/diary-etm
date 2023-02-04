import React, { useEffect, useState } from 'react'
import styles from './Gantt.module.css'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Story from './Story';
import TaskBoard from './TaskBoard';

const Task = ({ data, setShowTask }) => {
    const [isNew, setIsNew] = useState(true)

    const [valueStart, setValueStart] = useState(null);
    const [valueEnd, setValueEnd] = useState(null);

    const [valuePriority, setValuePriority] = useState(null)

    const [listThemes, setListThemes] = useState({ id: [], name: [] })
    const [valueThema, setValueThema] = useState(null)

    const [listConditions, setListConditions] = useState({ id: [], name: [] })
    const [valueConditio, setValueConditio] = useState(null)

    const [listPartners, setListPartners] = useState({ id: [], name: [] })
    const [valuePartner, setValuePartner] = useState(null)
    const [inputPartner, setInputPartner] = useState('')

    const [listUsers, setListUsers] = useState({ id: [], name: [] });
    const [valueUser, setValueUser] = useState(null);
    const [inputUser, setInputUser] = useState('');

    const [description, setDescription] = useState('')

    const [result, setResult] = useState('')

    const [showBoard, setShowBoard] = useState(false)
    const [showStory, setShowStory] = useState(false)



    useEffect(() => {

        if (data != null) {

        } else {
            getThemes()
            getConditions()
        }

    }, [])

    useEffect(() => {
        if (inputPartner) {
            getPartners();
        }
    }, [inputPartner])

    useEffect(() => {
        if (inputUser) {
            getUsers();
        }
    }, [inputUser])

    const getUsers = async () => {
        if (inputUser) {
          const response = await PostService.getListUsers(inputUser);
    
          var arrId = []
          var arrName = []
          response.data.map(item => {
            arrId.push(item.code);
            arrName.push(item.userName)
          })
          setListUsers({ id: arrId, name: arrName });
        }
      }

      const getConditions = async () => {
        const response = await PostService.getListConditions()

        var arrId = []
        var arrName = []
        response.data.map(item => {
            arrId.push(item.id);
            arrName.push(item.name)
        })
        setListConditions({ id: arrId, name: arrName });
    }

    const getThemes = async () => {
        const response = await PostService.getListThemes()

        var arrId = []
        var arrName = []
        response.data.map(item => {
            arrId.push(item.id);
            arrName.push(item.name)
        })
        setListThemes({ id: arrId, name: arrName });
    }

    const getPartners = async () => {
        const response = await PostService.getListPartners(inputPartner)

        var arrId = []
        var arrName = []
        response.data.map(item => {
            arrId.push(item.id);
            arrName.push(item.name)
        })
        setListPartners({ id: arrId, name: arrName });
    }

    const saveTask = () =>{

    }

    return (
        <div className={styles.outSide} onClick={() => setShowTask(false)}>
            <div className={styles.fr01} onClick={(e) => e.stopPropagation()}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                        <DatePicker
                            label="Дата начала"
                            value={valueStart}
                            onChange={(newValue) => {
                                setValueStart(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="Дата завершения"
                            value={valueEnd}
                            onChange={(newValue) => {
                                setValueEnd(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </LocalizationProvider>
                <Autocomplete
                    value={valuePriority}
                    onChange={(e, i) => {
                        setValuePriority(i);
                    }}

                    id="controllable-states-demo"
                    options={['1', '2', '3', '4', '5']}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Приоритет" />}
                />
                <Autocomplete
                    value={valueThema}
                    onChange={(e, i) => {
                        setValueThema(i);
                    }}

                    id="controllable-states-demo"
                    options={listThemes.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Тема" />}
                />
                <Autocomplete
                    value={valuePartner}
                    onChange={(e, i) => {
                        setValuePartner(i);
                        //const index = departments.name.indexOf(i);
                        //setCodeDepartment(departments.id[index])
                    }}
                    inputValue={inputPartner}
                    onInputChange={(event, newInputDepartment) => {
                        setInputPartner(newInputDepartment);
                    }}
                    id="controllable-states-demo"
                    options={listPartners.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Партнер" />}
                />
                <Autocomplete
                    value={valueUser}
                    onChange={(e, i) => {
                        setValueUser(i);
                        //const index = users.name.indexOf(i);
                        //setCodeUser(users.id[index])
                    }}
                    inputValue={inputUser}
                    onInputChange={(event, newInputValue) => {
                        setInputUser(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={listUsers.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Сотрудник" />}
                />
                <TextField
                    sx={{ width: '550px' }}
                    id="outlined-multiline-flexible"
                    label="Описание"
                    multiline
                    minRows={5}
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
                <Autocomplete
                    value={valueConditio}
                    onChange={(e, i) => {
                        setValueConditio(i);
                    }}

                    id="controllable-states-demo"
                    options={listConditions.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Состояние" />}
                />
                <TextField
                    sx={{ width: '550px' }}
                    id="outlined-multiline-flexible"
                    label="Результат"
                    multiline
                    minRows={5}
                    value={result} onChange={(e) => setResult(e.target.value)}
                />
                <div className={styles.task02}>
                <Button style={{backgroundColor: '#FFD700', color: '#000000'}} onClick={()=>setShowBoard(true)} variant='contained'>ДОСКА</Button>
                <Button style={{backgroundColor: '#FFD700', color: '#000000'}} onClick={()=>setShowStory(true)} variant='contained'>ИСТОРИЯ</Button>
                <Button style={{backgroundColor: '#FFD700', color: '#000000'}} onClick={saveTask} variant='contained'>СОХРАНИТЬ</Button>
                </div>
            </div>
            {showStory
            ?<Story setShowStory={setShowStory}/>
            :''
            }
            {showBoard
            ?<TaskBoard setShowBoard={setShowBoard}/>
            :''
            }
        </div>
    )
}

Task.defaultProps = { data: null };
export default Task
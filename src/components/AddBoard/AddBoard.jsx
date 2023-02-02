import React, { useState, useEffect } from 'react'
import TopMenu from '../TopMenu'
import styles from './AddBoard.module.css'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ChipsArray from './ChipsArray';

const AddBoard = () => {
    const [users, setUsers] = useState({ id: [], name: [] });
    const [valueStart, setValueStart] = useState(null);
    const [valueEnd, setValueEnd] = useState(null);
    const [description, setDescription] = useState();
    const [stage, setStage] = useState('');
    const [stick, setStick] = useState('');

    const [valueUser, setValueUser] = useState(null);
    const [codeUser, setCodeUser] = useState()
    const [inputUser, setInputUser] = useState('');

    const [chipUsers, setChipUsers] = useState([]);
    const [chipStages, setChipStages] = useState([]);
    const [chipStick, setChipStick] = useState([]);

    const [counter, setCounter] = useState(0)


    useEffect(() => {
        getUsers();
    }, [])

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
            setUsers({ id: arrId, name: arrName });
        }
    }

    const addStage = () => {
        if (stage == '') return
        setChipStages([...chipStages, { key: counter, data: { label: stage } }])
        setStage('')
        setCounter(counter + 1)
    }
    const addUser = () => {
        if (valueUser == '') return
        setChipUsers([...chipUsers, { key: counter, data: { codeUSer: codeUser, label: valueUser } }])
        setInputUser('')
        setCounter(counter + 1)

    }
    const addStick = () => {
        if (stick == '') return
        setChipStick([...chipStick, { key: counter, data: { label: stick } }])
        setStick('')
        setCounter(counter + 1)
    }

    const addSample = () => {
        // реализовать добавление на сервер
    }

    return (
        <div>
            <TopMenu />
            <div className={styles.ab01}>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    </LocalizationProvider>
                </div>
                <TextField
                    sx={{ width: '550px' }}
                    id="outlined-multiline-flexible"
                    label="Описание"
                    multiline
                    minRows={5}
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.ab04}>
                    <Button sx={{ marginRight: '10px' }} onClick={addStage} variant='contained'>Добавить</Button>
                    <TextField
                        sx={{ width: 300, marginRight: '10px' }}
                        id="outlined-basic"
                        label="Этап"
                        variant="outlined"
                        value={stage} onChange={(e) => setStage(e.target.value)}
                    />
                    <ChipsArray showBase={true} chipData={chipStages} setChipData={setChipStages} />
                </div>
                <div className={styles.ab04}>
                    <Button sx={{ marginRight: '10px' }} onClick={addUser} variant='contained'>Добавить</Button>
                    <Autocomplete
                        value={valueUser}
                        onChange={(e, i) => {
                            setValueUser(i);
                            const index = users.name.indexOf(i);
                            setCodeUser(users.id[index])
                        }}
                        inputValue={inputUser}
                        onInputChange={(event, newInputValue) => {
                            setInputUser(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={users.name}
                        sx={{ width: 300, marginRight: '10px' }}
                        renderInput={(params) => <TextField {...params} label="Сотрудник" />}
                    />
                    <ChipsArray chipData={chipUsers} setChipData={setChipUsers} />
                </div>
                <div className={styles.ab04}>
                    <Button sx={{ marginRight: '10px' }} onClick={addStick} variant='contained'>Добавить</Button>
                    <TextField
                        sx={{ width: 300, marginRight: '10px' }}
                        id="outlined-basic"
                        label="Задача"
                        variant="outlined"
                        value={stick} onChange={(e) => setStick(e.target.value)}
                    />
                    <ChipsArray chipData={chipStick} setChipData={setChipStick} />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', height: '100px'}}>
                <Button sx={{ marginTop: '30px' }} onClick={addSample} variant='contained'>Создать задачу</Button>
            </div>

        </div>
    )
}

export default AddBoard
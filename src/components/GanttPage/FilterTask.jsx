import React, { useEffect, useState } from 'react'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './Gantt.module.css'


const FilterTask = ({setFilterData, setDateInterval, setShowMenuFilter}) => {
  const [users, setUsers] = useState({ id: [], name: [] });
  const [departments, setDepartments] = useState({ id: [], name: [] })
  const [valueUser, setValueUser] = useState(null);
  const [codeUser, setCodeUser] = useState()
  const [inputUser, setInputUser] = useState('');
  const [valueDepartment, setValueDepartment] = useState(null);
  //const [codeDepartment, setCodeDepartment] = useState()
  const [inputDepartment, setInputDepartment] = useState('');

  const [valueStart, setValueStart] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);

  useEffect(() => {
    getUsers();
    getDepartment()
  }, [])

  useEffect(() => {
    if (inputUser) {
      getUsers();
    }
  }, [inputUser])

  useEffect(() => {
    if (inputDepartment) {
      getDepartment();
    }
  }, [inputDepartment])

  //Функции получения
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

  const viewTasks = async () => {
    if (valueStart && valueEnd) {
      setDateInterval({
        start: valueStart,
        end: valueEnd
      })
      //добавить сотояние

      const response = await PostService.getListTasks(valueStart.format('DD/MM/YYYY'), valueEnd.format('DD/MM/YYYY'), valueDepartment, codeUser);
      console.log(codeUser)
      setFilterData(response.data)
      setShowMenuFilter(false)
    }
  }

  const getDepartment = async () => {
    if (inputDepartment) {
      const response = await PostService.getListDepartments(inputDepartment);

      var arrId = []
      var arrName = []
      response.data.map(item => {
        arrId.push(item.id);
        arrName.push(item.department)
      })
      setDepartments({ id: arrId, name: arrName });
    }
  }

  return (
    <div className={styles.outSide} onClick={()=>setShowMenuFilter(false)}>
      <div className={styles.fr01} onClick={(e)=>e.stopPropagation()}>
        <div>{`Сотрудник: ${valueUser !== null ? `${valueUser}` : 'не выбран'}`}</div>
        <br />
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
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Сотрудник" />}
        />
        <div style={{ marginTop: '30px' }}>{`Отдел: ${valueDepartment !== null ? `${valueDepartment}` : 'не выбран'}`}</div>
        <br />
        <Autocomplete
          value={valueDepartment}
          onChange={(e, i) => {
            setValueDepartment(i);
            //const index = departments.name.indexOf(i);
            //setCodeDepartment(departments.id[index])
          }}
          inputValue={inputDepartment}
          onInputChange={(event, newInputDepartment) => {
            setInputDepartment(newInputDepartment);
          }}
          id="controllable-states-demo"
          options={departments.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Отдел" />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.fr02}>
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

        <Button style={{ marginTop: '15px' }} onClick={viewTasks} variant='contained'>ПОИСК</Button>
      </div>

    </div>
  )
}
export default FilterTask
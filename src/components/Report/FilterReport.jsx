import React, { useEffect, useState } from 'react'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './Report.module.css'
import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




const FilterReport = ({ setReportData, setShowMenuFilter}) => {
  const [users, setUsers] = useState({ id: [], name: [] });
  const [departments, setDepartments] = useState({ id: [], name: [] })
  const [valueUser, setValueUser] = useState(null);
  const [codeUser, setCodeUser] = useState()
  const [inputUser, setInputValue] = useState('');
  const [valueDepartment, setValueDepartment] = useState(null);
  const [codeDepartment, setCodeDepartment] = useState()
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

  const viewReport = async () => {

    if (valueStart && valueEnd) {
      const response = await PostService.getReport(valueStart.format('DD/MM/YYYY'), valueEnd.format('DD/MM/YYYY'), codeUser, codeDepartment);
      var subtitle = "Общий отчет"
      if (valueUser) {
        subtitle = "Отчет по сотруднику: " + valueUser
      } else if (valueDepartment) {
        subtitle = "От по офису: " + valueDepartment
      }

      setReportData(
        {
          tasks:{
            options: {
              chart: {
                title: "Отчет",
                subtitle: subtitle
              }
            },
            data: [
              ["Задачи", "Всего", "В работе", "Завершены"],
              [valueStart.format('DD/MM/YYYY')+"-"+valueEnd.format('DD/MM/YYYY'), response.data.tasks.count, response.data.tasks.inWork, response.data.tasks.seccessful]
            ]
          },
          sticks:{
            options: {
              chart: {
                title: "Отчет",
                subtitle: subtitle
              }
            },
            data: [
              ["Задачи на доске", "Всего","Не начаты", "В работе", "Завершены"],
              [valueStart.format('DD/MM/YYYY')+"-"+valueEnd.format('DD/MM/YYYY'), response.data.sticks.count, response.data.sticks.doWorkStick, response.data.sticks.inWork, response.data.sticks.seccessful]
            ]
          }
          
        }
      )

    }

    if (valueUser !== null) {

    }
    if (valueDepartment !== null) {

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
  const closeFilter = ()=>{
    setShowMenuFilter(false);
  } 

  return (
    <div className={styles.outSide} onClick={closeFilter}>
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
            setInputValue(newInputValue);
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
            const index = departments.name.indexOf(i);
            setCodeDepartment(departments.id[index])
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

        <Button style={{ marginTop: '15px' }} onClick={viewReport} variant='contained'>ПОИСК</Button>
      </div>

    </div>
  )
}

export default FilterReport
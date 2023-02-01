import React, { useEffect, useState } from 'react'
import PostService from '../../Api/PostService'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from './Report.module.css'


const FilterReport = () => {
  const [users, setUsers] = useState({id:[], name: []});
  const [departments, setDepartments] = useState({id:[], name: []})
  const [valueUser, setValueUser] = useState(null);
  const [codeUser, setCodeUser] = useState()
  const [inputUser, setInputValue] = useState('');
  const [valueDepartment, setValueDepartment] = useState(null);
  const [codeDepartment, setCodeDepartment] = useState()
  const [inputDepartment, setInputDepartment] = useState('');

  useEffect(()=>{
    getUsers();
    getDepartment()
  },[])

  useEffect(()=>{
    if(inputUser){
      getUsers();    
    }
  },[inputUser])

  useEffect(()=>{
    if(inputDepartment){
      getDepartment();    
    }
  },[inputDepartment])

  //Функции получения
  const getUsers = async ()=>{
    if(inputUser){
      const response = await PostService.getListUsers(inputUser);
    
      var arrId = []
      var arrName = []
      response.data.map(item=>{
        arrId.push(item.code);
        arrName.push(item.userName)
      })
      setUsers({id: arrId, name: arrName});
    }
  }

  const getDepartment = async ()=>{
    if(inputDepartment){
      const response = await PostService.getListDepartments(inputDepartment);
    
      var arrId = []
      var arrName = []
      response.data.map(item=>{
        arrId.push(item.id);
        arrName.push(item.department)
      })
      setDepartments({id: arrId, name: arrName});
    }
  }


  //Функция callback


  return (
    <div className={styles.outSide}>
      <div className={styles.fr01}>
        <div>{`Сотрудник: ${valueUser !== null ? `${valueUser}` : 'не выбран'}`}</div>
        <br />
        <Autocomplete
          value={valueUser}
          onChange={(e,i) => {
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
        <div style={{marginTop: '30px'}}>{`Отдел: ${valueDepartment !== null ? `${valueDepartment}` : 'не выбран'}`}</div>
        <br />
        <Autocomplete
          value={valueDepartment}
          onChange={(e,i) => {
            setValueDepartment(i);
            const index = departments.name.indexOf(i);
            console.log(index)
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
      </div>
      
    </div>
  )
}

export default FilterReport
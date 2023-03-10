import React from 'react'
import Button from '@mui/material/Button';
import styles from './StartPage.module.css';
import { Link } from 'react-router-dom';

const StartPage = () => {

  return (
    <div className={styles.sp01}>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/gantt">ЗАДАЧИ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/kanban">ДОСКА</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/report">ОТЧЁТ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/favorits">ИЗБРАННЫЕ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/addboard">СОЗДАТЬ ДОСКУ</Button>
    </div>
    
  )
}

export default StartPage
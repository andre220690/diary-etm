import React from 'react'
import Button from '@mui/material/Button';
import styles from './StartPage.module.css';
import { Link } from 'react-router-dom';
import { style } from '@mui/system';

const StartPage = () => {

  return (
    <div className={styles.sp01}>
      <Button className={styles.btnSp01} variant='contained' component={Link} to="/gantt">ЗАДАЧИ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link}>ДОСКА</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link}>ОТЧЁТ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link}>ИЗБРАННЫЕ</Button>
      <Button className={styles.btnSp01} variant='contained' component={Link}>СОЗДАТЬ ДОСКУ</Button>
    </div>
    
  )
}

export default StartPage
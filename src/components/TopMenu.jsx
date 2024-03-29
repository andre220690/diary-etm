import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './TopMenu.module.css'


const TopMenu = ({ buttons }) => {


    return (
        <div>
            <div className={styles.tm01}>
                <Button className={styles.tm02} variant='contained' component={Link} to="/gantt">ЗАДАЧИ</Button>
                <Button className={styles.tm02} variant='contained' component={Link} to="/kanban">ДОСКА</Button>
                <Button className={styles.tm02} variant='contained' component={Link} to="/report">ОТЧЁТ</Button>
                <Button className={styles.tm02} variant='contained' component={Link} to="/favorits">ИЗБРАННЫЕ</Button>
                <Button className={styles.tm02} variant='contained' component={Link} to="/addboard">СОЗДАТЬ ДОСКУ</Button>
                {buttons.map((item, i) =>
                    <Button
                        className={styles.tm02}
                        style={{ backgroundColor: '#FFD700', color: '#000000' }}
                        variant='contained' key={i}
                        onClick={item.action}>
                        {item.name}
                    </Button>
                )}
            </div>
        </div>
    )
}
TopMenu.defaultProps = { buttons: [] };
export default TopMenu
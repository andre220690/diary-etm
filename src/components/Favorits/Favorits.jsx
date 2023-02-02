import React, { useEffect, useState } from 'react'
import TopMenu from '../TopMenu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PostService from '../../Api/PostService';
import Button from '@mui/material/Button';
import { CircularProgress, Box } from '@mui/material';


const Favorits = () => {
  const [rows, setRows] = useState()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const response = await PostService.getFavorits(localStorage.getItem("UserCode"));
    //обработать и занести в rows
    var result = []
    if (response.data) {
      response.data.map(arr => {
        arr.map(item => {
          result.push(item)
        })
      })
    }
    setRows(result)
  }

  const onDelete = (id, type) => {
    //реализовать удаление
  }

  return (
    <div>
      <TopMenu />
      {rows
        ? <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Сотрудник</TableCell>
                  <TableCell align="right">Приоритет</TableCell>
                  <TableCell align="right">Подразделение</TableCell>
                  <TableCell align="right">Дата начала</TableCell>
                  <TableCell align="right">Дата завершения</TableCell>
                  <TableCell align="right">Статус</TableCell>
                  <TableCell align="right">Описание</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id + "/" + row.type}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.userName}</TableCell>
                    <TableCell align="right">{row.priority}</TableCell>
                    <TableCell align="right">{row.department}</TableCell>
                    <TableCell align="right">{row.dateStart}</TableCell>
                    <TableCell align="right">{row.dateEnd}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => onDelete(row.id, row.type)} variant='contained'>УДАЛИТЬ</Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        : <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
        </Box>
      }

    </div>
  )
}

export default Favorits
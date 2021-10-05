import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import swal from 'sweetalert';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const { users } = useSelector(state => state.data);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    swal({
      title: "Tem certeza?",
      text: "Deseja realmente deletar o item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Item removido com sucesso!", {
          icon: "success",
        });
        dispatch(deleteUser(id))
      }
    });
  }
  
  return (
    <div>
      <Stack direction="row" spacing={2} style={{ justifyContent: "space-between", display: "flex" }}>
        <div>
          <h2 style={{ paddingLeft: '20px'}}>Listagens das Entregas</h2>
        </div>
        <div style={{ margin: "5px" }}>
          <Fab color="primary" aria-label="add" onClick={()=>history.push("/addUser")}>
            <AddIcon />
          </Fab>
        </div>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Título</StyledTableCell>
              <StyledTableCell align="center">Descrição</StyledTableCell>
              <StyledTableCell align="center">Prazo de entrega</StyledTableCell>
              <StyledTableCell align="center">Entrega concluída</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.description}</StyledTableCell>
                <StyledTableCell align="center">{format(new Date(user.date), 'dd/MM/yyyy')}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.status ? 'Sim' : 'Não'}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ justifyContent: "center", display: "flex" }}> 
                  <Stack direction="row" spacing={2} align="center" >
                    <Button style={{ marginRight: "5px" }} onClick={()=> handleDelete(user.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                      Deletar
                    </Button>
                    <Button variant="contained" color="secondary"  endIcon={<EditIcon />} onClick={()=> history.push(`/editUser/${user.id}`)}>
                      Editar
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  )
}

export default Home

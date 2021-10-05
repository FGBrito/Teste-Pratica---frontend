import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ptBR from 'date-fns/locale/pt-BR';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getSingleTask, updateTask } from '../redux/actions';


const EditTask = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    date: "",
    status: true,
  });
  const [error, setError] = useState("");
  const { name, description, date, status} = state;
  let dispatch = useDispatch();
  const { task } = useSelector(state => state.data);
  let { id } = useParams();

  useEffect(()=>{
    dispatch(getSingleTask(id))
  },[])
  
  useEffect(()=>{
    if (task) {
      setState({
        ...task
      })
    }
  },[task])

  const handleChanges = (event) => {
    if (event && event.target) {
      if (event.target.type === "checkbox") { 
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
       } else {
        const {name, value} = event.target;
        setState({
          ...state,
          [name]: value,
        });
      }
    } else {
      setState({
        ...state,
        ['date']: event,
      });
    }
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( !name || !description || !date ) {
      setError('Por favor preenchar os campos');
    } else {
      dispatch(updateTask(state, id));
      history.push('/');
      setError("")
    }
  }

  return (
    <div>
      <Stack>
        <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={()=> history.push('/')}>
          Voltar
        </Button>
      </Stack>
     

      <h2>Adicionar nova tarefa.</h2>
      {error && <h3 style={{ color: 'red', }}>{error}</h3>}
      <div style={{ justifyContent: "center", display: "flex", margin: "10px" }}>
        <Stack
            component="form"
            sx={{
              width: '50ch',
            }}
            spacing={2}
            noValidate
            onSubmit={handleSubmit} 
            autoComplete="off"
          >
          <TextField
                required
                id="outlined-required"
                label="Título"
                type="text"
                name="name"
                value={name}
                onChange={handleChanges}
              />
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            name="description"
            value={description}
            onChange={handleChanges}
            rows={4}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
            <DatePicker
              label="Prazo de entrega"
              value={date}
              // mask={ptBR}
              name="date"
              onChange={handleChanges}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                label="Entrega concluída:"
                labelPlacement="start"
                name="status"
                value={status}
                onChange={handleChanges}
                control={
                  <Switch checked={status} onChange={handleChanges} name="status" />
                }
              />
            </FormGroup>
          </FormControl>

          <Button variant="contained" type="submit" startIcon={<SaveIcon />} >
            Atualizar
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default EditTask

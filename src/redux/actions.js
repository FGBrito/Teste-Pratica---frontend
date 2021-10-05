import * as types from "./actionType";
import axios from "axios";

export const loadTasks = () => {
  return function(dispatch){
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp)=>{
        dispatch({
          type: types.GET_TASK,
          payload: resp.data
        });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteTask = (id) => {
  return function(dispatch){
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((resp)=>{
        dispatch({
          type: types.DELETE_TASK
        });
        dispatch(loadTasks());
      })
      .catch((error) => console.log(error));
  };
};

export const addTask = (task) => {
  return function(dispatch){
    axios
      .post(`${process.env.REACT_APP_API}`, task)
      .then(()=>{
        dispatch({
          type: types.ADD_TASK
        });
        dispatch(loadTasks());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleTask = (id) => {
  return function(dispatch){
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((resp)=>{
        dispatch({
          type: types.GET_SINGLE_TASK,
          payload: resp.data
        });
      })
      .catch((error) => console.log(error));
  };
};

export const updateTask = (task, id) => {
  return function(dispatch){
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, task)
      .then(()=>{
        dispatch({
          type: types.UPDATE_TASK
        });
      })
      .catch((error) => console.log(error));
  };
};
import * as types from "./actionType";

const initialState = {
  tasks: [],
  task: {},
  loading: true 
}

const tasksReducers = (state = initialState, action) => {
  switch( action.type ){
    case types.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case types.DELETE_TASKS:
    case types.ADD_TASKS:
    case types.UPDATE_TASKS:
      return {
        ...state,
        loading: false,
      }
    case types.GET_SINGLE_TASKS:
      return {
        ...state,
        task: action.payload,
        loading: false
      }
    default:
      return state;
  }
};

export default tasksReducers;
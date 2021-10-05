import * as types from "./actionType";

const initialState = {
  tasks: [],
  task: {},
  loading: true 
}

const tasksReducers = (state = initialState, action) => {
  switch( action.type ){
    case types.GET_TASK:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case types.DELETE_TASK:
    case types.ADD_TASK:
    case types.UPDATE_TASK:
      return {
        ...state,
        loading: false,
      }
    case types.GET_SINGLE_TASK:
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
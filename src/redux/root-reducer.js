import { combineReducers } from "redux";
import tasksReducers from "./reducer";

console.log('tasksReducers', tasksReducers)

const rootReducers = combineReducers({
  data: tasksReducers
})

export default rootReducers;
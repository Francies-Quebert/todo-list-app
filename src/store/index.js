import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./reducer";

const reducers = combineReducers({ todoList: todoReducer });
export default reducers;

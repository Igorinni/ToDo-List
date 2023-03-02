import { combineReducers } from '@reduxjs/toolkit'
import todos from './slice/todo'
import user from './slice/user'

const rootReducers = combineReducers({
  todos,
  user,
})

export default rootReducers

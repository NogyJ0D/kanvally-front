import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import projectReducer from '../features/project/projectSlice'
import teamReducer from '../features/team/teamSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    team: teamReducer
    // tasks: taskReducer
  }
})

export default store

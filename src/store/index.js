import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import projectReducer from '../features/projectSlice'
import teamReducer from '../features/teamSlice'
import taskReducer from '../features/taskSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    team: teamReducer,
    task: taskReducer
  }
})

export default store

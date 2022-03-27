import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import projectReducer from '../features/project/projectSlice'
import teamReducer from '../features/team/teamSlice'
import taskReducer from '../features/task/taskSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    team: teamReducer,
    task: taskReducer
  }
})

export default store

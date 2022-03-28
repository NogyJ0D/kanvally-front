import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post, put, del } from '../../api'

export const createComment = createAsyncThunk('task/createComment', ({ teamId, idTask, username, text }, thunkAPI) => {
  return put(`/tasks/comment/team/${teamId}/option/add/idTask/${idTask}`, ({ username, text }))
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const deleteTask = createAsyncThunk('task/deleteTask', ({ teamId, taskId }, thunkAPI) => {
  return del(`/tasks/${teamId}/${taskId}`)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const createTask = createAsyncThunk('task/createTask', (data, thunkAPI) => {
  return post('/tasks', data)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err || res.errorMessages)
      else return res.data
    })
})

export const changeState = createAsyncThunk('task/changeState', (data, thunkAPI) => {
  console.log(data.state)
  return put(`/tasks/state/team/${data.teamId}/task/${data.taskId}`, { state: data.state })
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err || res.errorMessages)
      else return res.data
    })
})

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    exists: false,
    loading: true,
    error: false,
    message: undefined,

    comments: []
  },
  reducers: {
    clearTaskMessage (state, action) {
      state.error = false
      state.message = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.exists = true
      state.loading = false

      state.members = payload.comments
    })
    builder.addCase(createComment.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(deleteTask.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createTask.pending, (state, { payload }) => {
      state.loading = true
    })
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.loading = false
      state.tasks = payload.tasks
    })
    builder.addCase(createTask.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(changeState.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearTaskMessage } = taskSlice.actions
export default taskSlice.reducer

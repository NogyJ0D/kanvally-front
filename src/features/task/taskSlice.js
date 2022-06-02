import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post, put, del } from '../../api'

export const createComment = createAsyncThunk('task/createComment', (data, thunkAPI) => {
  console.log(data)
  return put(`/tasks/comment/team/${data.teamId}/option/add/idTask/${data.idTask}`, data)
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

export const deleteComment = createAsyncThunk('task/deleteComment', ({ idTeam, idTask, idComment }, thunkAPI) => {
  return put(`/tasks/comment/team/${idTeam}/option/delete/idTask/${idTask}`, { idComment })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    exists: false,
    loading: false,
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
    builder.addCase(createComment.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.exists = true
      state.loading = false

      state.comments = payload.comments
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

    builder.addCase(deleteComment.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearTaskMessage } = taskSlice.actions
export default taskSlice.reducer

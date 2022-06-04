import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { put, get } from '../api'

export const createComment = createAsyncThunk('task/createComment', (data, thunkAPI) => {
  return put(`/tasks/comment/team/${data.teamId}/option/add/idTask/${data.idTask}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
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

export const getComments = createAsyncThunk('task/getComments', ({ id, idTeam }, thunkAPI) => {
  return get(`/tasks/${id}/id-team/${idTeam}/comments`)
    .then(res => {
      return res.data
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.exists = true
      state.loading = false

      state.comments = payload
    })
    builder.addCase(createComment.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.comments = payload.comments
    })
    builder.addCase(deleteComment.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(getComments.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.comments = payload.comments
    })
  }
})

export default taskSlice.reducer

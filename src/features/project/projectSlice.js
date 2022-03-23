import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post } from '../../api'

export const getById = createAsyncThunk('project/getById', (id, thunkAPI) => {
  return get(`/projects/${id}/teams`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const createProject = createAsyncThunk('project/createProject', (data, thunkAPI) => {
  return post('/projects', data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    exists: false,
    loading: false,
    error: false,
    message: undefined,

    id: undefined,
    name: undefined,
    idBoss: undefined,
    logo: undefined,
    teams: [],
    members: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getById.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getById.fulfilled, (state, { payload }) => {
      state.exists = true
      state.loading = false

      state.id = payload._id
      state.name = payload.name
      state.idBoss = payload.idBoss
      state.logo = payload.logo
      state.teams = payload.teams
      state.members = payload.members
    })
    builder.addCase(getById.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createProject.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(createProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default projectSlice.reducer

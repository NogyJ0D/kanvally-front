import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, put } from '../../api'

export const getById = createAsyncThunk('project/getById', ({ id, userid }, thunkAPI) => {
  return get(`/projects/${id}/${userid}/all`)
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

export const inviteToProject = createAsyncThunk('project/inviteToProject', (data, thunkAPI) => {
  return put(`/projects/invite/projectid/${data.projectId}`, data)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data.message
    })
})

export const expelFromProject = createAsyncThunk('project/expelFromProject', (data, thunkAPI) => {
  return put(`/projects/expel/${data.projectId}/${data.userId}`, data)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data.message
    })
})

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    exists: false,
    loading: true,
    error: false,
    message: undefined,

    id: undefined,
    name: undefined,
    idBoss: undefined,
    logoUrl: undefined,
    teams: [],
    members: []
  },
  reducers: {
    clearProjectMessage (state, action) {
      state.error = false
      state.message = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getById.fulfilled, (state, { payload }) => {
      state.exists = true
      state.loading = false

      state.id = payload._id
      state.name = payload.name
      state.idBoss = payload.idBoss
      state.logoUrl = payload.logoUrl
      state.teams = payload.teams
      state.members = payload.members
    })
    builder.addCase(getById.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(createProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(inviteToProject.fulfilled, (state, { payload }) => {
      state.loading = false
      state.message = payload
    })
    builder.addCase(inviteToProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(expelFromProject.fulfilled, (state, { payload }) => {
      state.loading = false
      state.message = payload
    })
    builder.addCase(expelFromProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearProjectMessage } = projectSlice.actions
export default projectSlice.reducer

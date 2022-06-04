import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { del, get, post, put } from '../api'

export const getById = createAsyncThunk('project/getById', ({ id, userid }, thunkAPI) => {
  return get(`/projects/${id}/${userid}/all`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const inviteToProject = createAsyncThunk('project/inviteToProject', (data, thunkAPI) => {
  return put(`/projects/invite/projectid/${data.projectId}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data.message
    })
})

export const expelFromProject = createAsyncThunk('project/expelFromProject', (data, thunkAPI) => {
  return put(`/projects/expel/${data.projectId}/${data.userId}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const createTeam = createAsyncThunk('project/createTeam', ({ projectId, data }, thunkAPI) => {
  return post(`/teams/${projectId}`, { name: data.name, idLeader: data.idLeader, logoUrl: data.logoUrl })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const deleteTeam = createAsyncThunk('project/deleteTeam', ({ projectId }, thunkAPI) => {
  return del(`/teams/${projectId}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
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
    },
    clearProject (state, action) {
      state.exists = false
      state.loading = true
      state.error = false
      state.message = undefined

      state.id = undefined
      state.name = undefined
      state.idBoss = undefined
      state.logoUrl = undefined
      state.teams = []
      state.members = []
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

    builder.addCase(inviteToProject.pending, (state, action) => {
      state.message = 'Enviando invitación...'
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
      state.members = payload.projectMembers
    })
    builder.addCase(expelFromProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createTeam.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createTeam.fulfilled, (state, { payload }) => {
      state.loading = false

      state.teams = payload.teams
    })
    builder.addCase(createTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(deleteTeam.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(deleteTeam.fulfilled, (state, { payload }) => {
      state.loading = false

      state.teams = payload.teams
    })
    builder.addCase(deleteTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearProjectMessage, clearProject } = projectSlice.actions
export default projectSlice.reducer

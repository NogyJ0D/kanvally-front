import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { del, get, post, put } from '../../api'

export const createTeam = createAsyncThunk('team/createTeam', ({ projectId, data }, thunkAPI) => {
  return post(`/teams/${projectId}`, data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const getTeamById = createAsyncThunk('team/getTeamById', (id, thunkAPI) => {
  return get(`/teams/${id}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const inviteToTeam = createAsyncThunk('team/inviteToTeam', (data, thunkAPI) => {
  return put(`/teams/invite/${data.teamId}`, { userid: data.userid, role: data.role })
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const changeRole = createAsyncThunk('team/changeRole', ({ teamId, userId, userRole }, thunkAPI) => {
  return put(`/teams/role/${teamId}`, ({ userId, userRole }))
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const expelFromTeam = createAsyncThunk('team/expelFromTeam', ({ teamId, userId }, thunkAPI) => {
  return put(`/teams/expel/${teamId}/${userId}`)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

const teamSlice = createSlice({
  name: 'user',
  initialState: {
    exists: false,
    loading: true,
    error: false,
    message: undefined,

    id: undefined,
    name: undefined,
    idProject: undefined,
    idLeader: undefined,
    members: [],
    tasks: []
  },
  reducers: {
    clearTeamMessage (state, action) {
      state.error = false
      state.message = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createTeam.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createTeam.fulfilled, (state, { payload }) => {
      state.loading = false
      state.exists = true
    })
    builder.addCase(createTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(getTeamById.fulfilled, (state, { payload }) => {
      state.loading = false
      state.exists = true

      state.id = payload._id
      state.name = payload.name
      state.idProject = payload.idProject
      state.idLeader = payload.idLeader
      state.members = payload.members
      state.tasks = payload.tasks
    })
    builder.addCase(getTeamById.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(inviteToTeam.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(inviteToTeam.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(inviteToTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(changeRole.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(changeRole.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(changeRole.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(expelFromTeam.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(expelFromTeam.fulfilled, (state, { payload }) => {
      state.loading = false
    })
    builder.addCase(expelFromTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearTeamMessage } = teamSlice.actions
export default teamSlice.reducer

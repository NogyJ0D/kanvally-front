import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { del, get, post, put } from '../api'

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
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const changeRole = createAsyncThunk('team/changeRole', ({ teamId, userId, userRole }, thunkAPI) => {
  return put(`/teams/role/${teamId}`, ({ userId, userRole }))
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const expelFromTeam = createAsyncThunk('team/expelFromTeam', ({ teamId, userId }, thunkAPI) => {
  return put(`/teams/expel/${teamId}/${userId}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const createTask = createAsyncThunk('team/createTask', (data, thunkAPI) => {
  return post('/tasks', data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err || res.errorMessages)
      else return res.data
    })
})

export const changeState = createAsyncThunk('team/changeState', (data, thunkAPI) => {
  return put(`/tasks/state/team/${data.teamId}/task/${data.taskId}`, { state: data.state })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err || res.errorMessages)
      else return res.data
    })
})

export const deleteTask = createAsyncThunk('team/deleteTask', ({ teamId, taskId }, thunkAPI) => {
  return del(`/tasks/${teamId}/${taskId}`)
    .then(res => {
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
    logoUrl: undefined,
    idProject: undefined,
    idLeader: undefined,
    members: [],
    tasks: {}
  },
  reducers: {
    clearTeamMessage (state, action) {
      state.error = false
      state.message = undefined
    },
    clearTeam (state, action) {
      state.exists = false
      state.loading = true
      state.error = false
      state.message = undefined

      state.id = undefined
      state.name = undefined
      state.idProject = undefined
      state.idLeader = undefined
      state.logoUrl = undefined
      state.members = []
      state.tasks = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamById.pending, (state, action) => {
      state.loading = true
      state.exists = false
      state.error = false
      state.message = undefined
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
      state.logoUrl = payload.logoUrl
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

      state.members = payload.teamMembers
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

      state.members = payload.team.members
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

      state.members = payload.teamMembers
    })
    builder.addCase(expelFromTeam.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createTask.pending, (state, { payload }) => {
      state.loading = true
    })
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.loading = false
      state.tasks = payload
    })
    builder.addCase(createTask.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(changeState.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(changeState.fulfilled, (state, { payload }) => {
      state.loading = false
      state.tasks = payload
    })
    builder.addCase(changeState.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.loading = false

      state.tasks = payload.tasks
    })
    builder.addCase(deleteTask.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export const { clearTeamMessage, clearTeam } = teamSlice.actions
export default teamSlice.reducer

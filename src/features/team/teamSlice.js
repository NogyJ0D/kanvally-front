import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, put } from '../../api'

export const createTeam = createAsyncThunk('team/createTeam', ({ projectId, data }, thunkAPI) => {
  return post(`/teams/${projectId}`, data)
    .then(res => {
      console.log(res)
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const getTeamById = createAsyncThunk('team/getTeamById', (id, thunkAPI) => {
  return get(`/teams/${id}`)
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
    loading: false,
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

    builder.addCase(getTeamById.pending, (state, action) => {
      state.loading = true
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
  }
})

export const { clearTeamMessage } = teamSlice.actions
export default teamSlice.reducer

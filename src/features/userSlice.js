import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { del, get, post } from '../api'

export const login = createAsyncThunk('user/login', ({ email, password }, thunkAPI) => {
  return post('/auth/login', { email, password })
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const getProjects = createAsyncThunk('user/getProjects', (id, thunkAPI) => {
  return get(`/users/${id}/projects`)
    .then(res => {
      if (res.data.fail) return thunkAPI.rejectWithValue(res.data.err)
      else return res.data.projects
    })
})

export const autologin = createAsyncThunk('user/autologin', (nullDefault, thunkAPI) => {
  return post('/auth/validate')
    .then(res => {
      if (res.data.fail) return thunkAPI.rejectWithValue(res.data.err)
      else return res.data
    })
})

export const signup = createAsyncThunk('user/signup', (data, thunkAPI) => {
  return post('/auth/signup', data)
    .then(res => {
      if (res.data.fail) return thunkAPI.rejectWithValue(res.data.err)
      else return res.data
    })
})

export const logout = createAsyncThunk('user/logout', (nullDefault, thunkAPI) => {
  return post('/auth/logout')
    .then(res => { return res.data })
})

export const createProject = createAsyncThunk('user/createProject', (data, thunkAPI) => {
  return post('/projects', data)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

export const deleteProject = createAsyncThunk('user/deleteProject', (projectId, thunkAPI) => {
  return del(`/projects/${projectId}`)
    .then(res => {
      if (res.fail) return thunkAPI.rejectWithValue(res.err)
      else return res.data
    })
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    loading: true,
    error: false,
    message: undefined,

    username: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    id: undefined,
    role: undefined,
    projects: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.email = payload.email
      state.firstname = payload.firstname
      state.id = payload.id
      state.lastname = payload.lastname
      state.role = payload.role
      state.username = payload.username
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(autologin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.email = payload.email
      state.firstname = payload.firstname
      state.id = payload.id
      state.lastname = payload.lastname
      state.role = payload.role
      state.username = payload.username
    })
    builder.addCase(autologin.rejected, (state, { payload }) => {
      state.loading = false
      state.logged = false
    })

    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.loading = false
      state.projects = payload
    })
    builder.addCase(getProjects.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false
      state.logged = false

      state.username = undefined
      state.email = undefined
      state.firstname = undefined
      state.lastname = undefined
      state.id = undefined
      state.role = undefined
      state.projects = []
    })

    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = false

      state.message = payload.message
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      state.loading = false
      state.projects = payload.userProjects
    })
    builder.addCase(createProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.error = false
      state.message = undefined

      state.projects = payload.projects
    })
    builder.addCase(deleteProject.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default userSlice.reducer

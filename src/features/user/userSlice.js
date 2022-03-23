import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post } from '../../api'

export const login = createAsyncThunk('user/login', ({ email, password }, thunkAPI) => {
  return post('/auth/login', { email, password })
    .then(res => {
      console.log(res)
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    logged: false,
    loading: false,
    error: false,
    message: undefined,

    username: undefined,
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    id: undefined,
    role: undefined,
    profile_pic: undefined,
    projects: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.email = payload.email
      state.firstname = payload.firstname
      state.id = payload.id
      state.lastname = payload.lastname
      state.profile_pic = payload.profile_pic
      state.role = payload.role
      state.username = payload.username
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })

    builder.addCase(autologin.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(autologin.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.email = payload.email
      state.firstname = payload.firstname
      state.id = payload.id
      state.lastname = payload.lastname
      state.profile_pic = payload.profile_pic
      state.role = payload.role
      state.username = payload.username
    })
    builder.addCase(autologin.rejected, (state, { payload }) => {
      state.loading = false
      state.logged = false
    })

    builder.addCase(getProjects.pending, (state, action) => {
      state.loading = true
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

    builder.addCase(logout.pending, (state, action) => {
      state.loading = true
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
      state.profile_pic = undefined
      state.projects = []
    })

    builder.addCase(signup.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.loading = false
      state.logged = true

      state.email = payload.email
      state.firstname = payload.firstname
      state.id = payload.id
      state.lastname = payload.lastname
      state.profile_pic = payload.profile_pic
      state.role = payload.role
      state.username = payload.username
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.loading = false
      state.error = true
      state.message = payload
    })
  }
})

export default userSlice.reducer

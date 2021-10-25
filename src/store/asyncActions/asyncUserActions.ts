import jwtDecode from "jwt-decode"
import { Dispatch } from "redux"
import { UserActions, setUser, logoutAction, setAuthError } from '../actions/userActions'
import API from '../../http/API'

export const registration = (name: string, email: string, password: string, img: string) => async (dispatch: Dispatch<UserActions>) => {
  const res = await API.user.registration(name, email, password, img)
  if (!res.data.token && res.data.message) {
    return dispatch(setAuthError(res.data.message))
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
    dispatch(setAuthError(''))
  }
}

export const login = (name: string, password: string) => async (dispatch: Dispatch<UserActions>) => {
  const res = await API.user.login(name, password)
  if (!res.data.token && res.data.message) {
    return dispatch(setAuthError(res.data.message))
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
    dispatch(setAuthError(''))
  }
}

export const authCheck = () => async (dispatch: Dispatch<UserActions>) => {
  const res = await API.user.auth()
  if (!res.data.token) {
    return false
  }

  if (res.data.token) {
    dispatch(setUser(jwtDecode(res.data.token)))
    localStorage.setItem('my-notes-token', res.data.token)
  }
}

export const logout = () => (dispatch: Dispatch<UserActions>) => {
  localStorage.setItem('my-notes-token', '')
  dispatch(logoutAction())
}

export const sendEmailResetPassword = (nameOrEmail: string) => async (dispatch: Dispatch<UserActions>) => {
  const res = await API.user.sendEmailResetPassword(nameOrEmail)
  if (res.status !== 200 && res.data.message) {
    return dispatch(setAuthError(res.data.message))
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
    dispatch(setAuthError(''))
  }
}

export const resetPassword = (tokenId: string, newPass: string) => async (dispatch: Dispatch<UserActions>) => {
  await API.user.resetPassword(tokenId, newPass)
}
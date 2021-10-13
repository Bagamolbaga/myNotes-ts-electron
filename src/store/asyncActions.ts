import jwtDecode from "jwt-decode"
import { Dispatch } from "redux"
import {
  IAction,
  createGroup,
  createNote,
  getGroups,
  getNotes,
  editNote,
  setUser,
  logoutAction,
  setAuthError,
  deleteNote,
  setLoading
} from './actions'
import { IState } from "../types/state"
import API from '../http/API'
import { socketRef } from '../http/socket-io'

export const createAsyncNote = (data: any) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user, selectedGroup } = getState()
  const res = await API.note.createNote(data, user, Number(selectedGroup === 'All' ? data.group_id : selectedGroup))
  if (res.status === 200) {
    dispatch(createNote(res.data))
    socketRef.emit('newNote', res.data)
  }
}

export const createAsyncGroup = (title: string) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.group.createGroup(title, user)
  if (res.status === 200) {
    dispatch(createGroup(res.data))
    socketRef.emit('newGroup', res.data)
  }
}

export const getAsyncGroup = () => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  dispatch(setLoading(true))
  const res = await API.group.getGroups(user)
  if (res.status === 200) {
    dispatch(getGroups(res.data))
  }
}

export const getAsyncNotes = () => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.note.getNotes(user)
  if (res.status === 200) {
    dispatch(getNotes(res.data))
    dispatch(setLoading(false))
  }
}

export const editAsyncNotes = (data: any) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { selectNoteId } = getState()
  const res = await API.note.editNote(Number(selectNoteId), data)
  if (res.status === 200) {
    dispatch(editNote({ title: data.title, text: data.text, tags: data.tags }))
    socketRef.emit('editNote', { title: data.title, text: data.text, tags: data.tags, selectNoteId })
  }
}

export const fixedNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.note.fixedNote(id)
  if (res.status === 200) {
    dispatch(editNote({ toFixed: true, id }))
    socketRef.emit('fixedNote', { toFixed: true, id })
  }
}

export const unFixedNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.note.unFixedNote(id)
  if (res.status === 200) {
    dispatch(editNote({ toUnFixed: true, id }))
    socketRef.emit('unFixedNote', { toUnFixed: true, id })
  }
}

export const asyncDeleteNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.note.deleteNote(id)
  if (res.data) {
    dispatch(deleteNote(id))
    socketRef.emit('deleteNote', id)
  }
}

export const registration = (name: string, email: string, password: string, img: string) => async (dispatch: Dispatch<IAction>) => {
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

export const login = (name: string, password: string) => async (dispatch: Dispatch<IAction>) => {
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

export const authCheck = () => async (dispatch: Dispatch<IAction>) => {
  const res = await API.user.auth()
  if (!res.data.token) {
    return false
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
  }
}

export const logout = () => (dispatch: Dispatch<IAction>) => {
  localStorage.setItem('my-notes-token', '')
  dispatch(logoutAction())
}

export const sendEmailResetPassword = (nameOrEmail: string) => async (dispatch: Dispatch<IAction>) => {
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

export const resetPassword = (tokenId: string, newPass: string) => async (dispatch: Dispatch<IAction>) => {
  await API.user.resetPassword(tokenId, newPass)
  
}
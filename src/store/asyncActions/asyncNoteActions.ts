import { Dispatch } from "redux"
import { NoteActions, createNote, deleteNote, editNote, getNotes } from '../actions/noteActions'
import { OtherActions, setLoading } from "../actions/otherActions"
import { IState } from "../../types/state"
import API from '../../http/API'
import { socketRef } from '../../http/socket-io'

export const createAsyncNote = (data: any) => async (dispatch: Dispatch<NoteActions>, getState: () => IState) => {
  const { user, selectedGroup } = getState()
  const res = await API.note.createNote(data, user, Number(selectedGroup === 'All' ? data.group_id : selectedGroup))
  if (res.status === 200) {
    dispatch(createNote(res.data))
    socketRef.emit('newNote', res.data)
  }
}

type NoteAndOtherActions = NoteActions | OtherActions
export const getAsyncNotes = () => async (dispatch: Dispatch<NoteAndOtherActions>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.note.getNotes(user)
  if (res.status === 200) {
    dispatch(getNotes(res.data))
    dispatch(setLoading(false))
  }
}
export const editAsyncNotes = (data: any) => async (dispatch: Dispatch<NoteActions>, getState: () => IState) => {
  const { selectNoteId } = getState()
  const res = await API.note.editNote(Number(selectNoteId), data)
  if (res.status === 200) {
    dispatch(editNote({ title: data.title, text: data.text, tags: data.tags }))
    socketRef.emit('editNote', { title: data.title, text: data.text, tags: data.tags, selectNoteId })
  }
}
export const fixedNote = (id: number) => async (dispatch: Dispatch<NoteActions>) => {
  const res = await API.note.fixedNote(id)
  if (res.status === 200) {
    dispatch(editNote({ toFixed: true, id }))
    socketRef.emit('fixedNote', { toFixed: true, id })
  }
}
export const unFixedNote = (id: number) => async (dispatch: Dispatch<NoteActions>) => {
  const res = await API.note.unFixedNote(id)
  if (res.status === 200) {
    dispatch(editNote({ toUnFixed: true, id }))
    socketRef.emit('unFixedNote', { toUnFixed: true, id })
  }
}
export const asyncDeleteNote = (id: number) => async (dispatch: Dispatch<NoteActions>) => {
  const res = await API.note.deleteNote(id)
  if (res.data) {
    dispatch(deleteNote(id))
    socketRef.emit('deleteNote', id)
  }
}
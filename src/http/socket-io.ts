import { io } from 'socket.io-client'
import { createGroup } from '../store/actions/groupActions'
import { createNote, deleteNote, editNote, selectNote } from '../store/actions/noteActions'
import { store } from '../store/store'
import { IGroup, INote } from '../types/state'

export const socketRef = io('https://baga-my-notes-server-ts-v2.herokuapp.com')

socketRef.on('newNote', (data: INote) => {
  store.dispatch(createNote(data))
})

socketRef.on('deleteNote', (id: number) => {
  store.dispatch(deleteNote(id))
})

socketRef.on('editNote', (data: any) => {
  store.dispatch(selectNote(data.selectNoteId))
  store.dispatch(editNote(data))
})

socketRef.on('fixedNote', (data: any) => {
  store.dispatch(editNote(data))
})

socketRef.on('unFixedNote', (data: any) => {
  store.dispatch(editNote(data))
})

socketRef.on('newGroup', (data: IGroup) => {
  store.dispatch(createGroup(data))
})

import { io } from 'socket.io-client'
import { createGroup, createNote, deleteNote, editNote, selectNote } from '../store/actions'
import { store } from '../store/store'
import { IGroup, INote } from '../types/state'

export const socketRef = io('https://baga-my-notes-server-ts-v2.herokuapp.com')

socketRef.on('connect', () => {
  console.log(`connect ${socketRef.id}`)
})

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
  console.log(data)
  store.dispatch(editNote(data))
})

socketRef.on('unFixedNote', (data: any) => {
  store.dispatch(editNote(data))
})

socketRef.on('newGroup', (data: IGroup) => {
  store.dispatch(createGroup(data))
})

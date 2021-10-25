// import { IUser, IGroup, INote } from '../types/state'

// export enum actionTypes {
//     GET_NOTES = 'GET_NOTES',
//     CREATE_NOTE = 'CREATE_NOTE',
//     GET_GROUP = 'GET_GROUP',
//     CREATE_GROUP = 'CREATE_GROUP',
//     SHOW_ALL_NOTES = 'SHOW_ALL_NOTES',
//     SHOW_CREATE_NOTE_FORM = 'SHOW_CREATE_NOTE_FORM',
//     SELECT_ACTIVE_GROUP = 'SELECT_ACTIVE_GROUP',
//     SHOW_ACTIVE_GROUP = 'SHOW_ACTIVE_GROUP',
//     SELECT_NOTE = 'SELECT_NOTE',
//     EDIT_SELECT_NOTE = 'EDIT_SELECT_NOTE',
//     SHOW_EDIT_NOTE_FORM = 'SHOW_EDIT_NOTE_FORM',
//     SET_USER = 'SET_USER',
//     LOGOUT = 'LOGOUT',
//     SET_EROR = 'SET_EROR',
//     GO_BACK = 'GO_BACK',
//     DELETE_NOTE = 'DELETE_NOTE',
//     SET_LOADING = 'SET_LOADING'
// }

// interface setUserAction {
//     type: actionTypes.SET_USER
//     payload: IUser
// }

// interface createNoteAction {
//     type: actionTypes.CREATE_NOTE
//     payload: INote
// }

// interface getGroupsAction {
//     type: actionTypes.GET_GROUP
//     payload: IGroup[]
// }

// interface getNotesAction {
//     type: actionTypes.GET_NOTES
//     payload: INote[]
// }

// interface createGroupAction {
//     type: actionTypes.CREATE_GROUP
//     payload: IGroup
// }

// interface showAllNoteAction {
//     type: actionTypes.SHOW_ALL_NOTES
// }

// interface showCreateNoteFormAction {
//     type: actionTypes.SHOW_CREATE_NOTE_FORM
// }

// interface showEditFormAction {
//     type: actionTypes.SHOW_EDIT_NOTE_FORM
// }

// interface selectActiveGroupAction {
//     type: actionTypes.SELECT_ACTIVE_GROUP
//     payload: number
// }

// interface selectNoteAction {
//     type: actionTypes.SELECT_NOTE
//     payload: number
// }

// interface editNoteAction {
//     type: actionTypes.EDIT_SELECT_NOTE
//     payload: editNoteObj
// }


// interface deleteNoteAction {
//     type: actionTypes.DELETE_NOTE
//     payload: number
// }

// interface logoutActionAction {
//     type: actionTypes.LOGOUT
// }

// interface setAuthErrorAction {
//     type: actionTypes.SET_EROR
//     payload: string
// }

// interface goBackAction {
//     type: actionTypes.GO_BACK
// }

// interface setLoadingAction {
//   type: actionTypes.SET_LOADING
//   payload: boolean
// }

// export const createNote = (value: INote) : createNoteAction => ({
//     type: actionTypes.CREATE_NOTE,
//     payload: value,
//   })
  
//   export const getGroups = (value: IGroup[]) : getGroupsAction => ({
//     type: actionTypes.GET_GROUP,
//     payload: value,
//   })
  
//   export const getNotes = (value: INote[]) : getNotesAction => ({
//     type: actionTypes.GET_NOTES,
//     payload: value,
//   })
  
//   export const createGroup = (value: IGroup) : createGroupAction => ({
//     type: actionTypes.CREATE_GROUP,
//     payload: value,
//   })
  
//   export const showAllNote = () : showAllNoteAction => ({
//     type: actionTypes.SHOW_ALL_NOTES,
//   })
  
//   export const showCreateNoteForm = () : showCreateNoteFormAction => ({
//     type: actionTypes.SHOW_CREATE_NOTE_FORM,
//   })
  
//   export const showEditForm = () : showEditFormAction => ({
//     type: actionTypes.SHOW_EDIT_NOTE_FORM,
//   })
  
//   export const selectActiveGroup = (value: number) : selectActiveGroupAction => ({
//     type: actionTypes.SELECT_ACTIVE_GROUP,
//     payload: value,
//   })
  
//   export const selectNote = (id: number) : selectNoteAction => ({
//     type: actionTypes.SELECT_NOTE,
//     payload: id,
//   })
  
//   type editNoteObj = {
//     title?: string
//     text?: string
//     tags?: string[]
//     toFixed?: boolean
//     toUnFixed?: boolean 
//     id?: number
//   }

//   export const editNote = (value: editNoteObj) : editNoteAction => ({
//     type: actionTypes.EDIT_SELECT_NOTE,
//     payload: value,
//   })
  
//   export const deleteNote = (id: number) : deleteNoteAction => ({
//     type: actionTypes.DELETE_NOTE,
//     payload: id,
//   })
  
//   export const setUser = (value: IUser) : setUserAction  => ({
//     type: actionTypes.SET_USER,
//     payload: value,
// })
  
//   export const logoutAction = () : logoutActionAction => ({
//     type: actionTypes.LOGOUT,
//   })
  
//   export const setAuthError = (value: string) : setAuthErrorAction => ({
//     type: actionTypes.SET_EROR,
//     payload: value,
//   })
  
//   export const goBack = () : goBackAction => ({
//     type: actionTypes.GO_BACK,
//   })

//   export const setLoading = (value: boolean) : setLoadingAction => ({
//     type: actionTypes.SET_LOADING,
//     payload: value
//   })

// export type IAction = 
//     setUserAction | 
//     createNoteAction |
//     getGroupsAction | 
//     getNotesAction |
//     createGroupAction |
//     showAllNoteAction |
//     showCreateNoteFormAction |
//     showEditFormAction |
//     selectActiveGroupAction |
//     selectNoteAction |
//     editNoteAction |
//     deleteNoteAction |
//     logoutActionAction |
//     setAuthErrorAction |
//     goBackAction |
//     setLoadingAction
export {}
import { IState } from '../types/state'
import { IActions, userActionTypes, groupActionTypes, noteActionTypes, otherActionTypes } from './actions/index'

const initialState: IState = {
    selectNoteId: false,
    selectedGroup: 'All',
    showCeateNoteForm: false,
    showEditNoteForm: false,
    authError: '',
    loading: false,
    user: {
        isLogin: false,
    },
    groups: [],
    notes: [],
  }

export const reducer = (state = initialState, action: IActions) : IState => {
    switch (action.type) {
        case noteActionTypes.GET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
      }
    case noteActionTypes.CREATE_NOTE:
      return {
        ...state,
        selectNoteId: action.payload.id,
        showCeateNoteForm: false,
        notes: [...state.notes, action.payload],
      }
    case groupActionTypes.GET_GROUP:
      return {
        ...state,
        groups: [...action.payload],
      }
    case groupActionTypes.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      }
    case noteActionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectNoteId: false,
        selectedGroup: 'All',
        showCeateNoteForm: false,
        showEditNoteForm: false,
      }
    case noteActionTypes.SHOW_CREATE_NOTE_FORM:
      return {
        ...state,
        showCeateNoteForm: true,
        selectedGroup: 'All',
      }
    case groupActionTypes.SELECT_ACTIVE_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
        selectNoteId: false,
      }
    case noteActionTypes.SHOW_EDIT_NOTE_FORM:
      return {
        ...state,
        showEditNoteForm: true,
      }
    case noteActionTypes.SELECT_NOTE:
      return {
        ...state,
        selectNoteId: action.payload,
      }
    case noteActionTypes.EDIT_SELECT_NOTE:
      const notes = [...state.notes]
      notes.map((note) => {
        const item = note
        if (action.payload.toFixed) {
          if (item.id === action.payload.id) {
            item.fixed = true
          }
        } else if (action.payload.toUnFixed) {
          if (item.id === action.payload.id) {
            item.fixed = false
          }
        } else if (item.id === state.selectNoteId) {
          if(action.payload.title && action.payload.text && action.payload.tags){
            item.title = action.payload.title
            item.text = action.payload.text
            item.tags = action.payload.tags
          }
        }
        return note
      })
      return {
        ...state,
        notes: [...notes],
        showEditNoteForm: false,
      }
    case noteActionTypes.DELETE_NOTE:
      const nots = state.notes.filter((note) => note.id !== action.payload)
      return {
        ...state,
        notes: [...nots],
      }
    case userActionTypes.SET_USER:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          avatar: action.payload.avatar,
          isLogin: true,
        },
      }
    case userActionTypes.LOGOUT:
      return {
        ...state,
        user: {
          isLogin: false,
        },
        groups: [],
        notes: []
      }
    case userActionTypes.SET_EROR:
      return {
        ...state,
        authError: action.payload,
      }
    case otherActionTypes.GO_BACK:
      return {
        ...state,
        selectNoteId: false,
        // selectedGroup: 'All',
        showCeateNoteForm: false,
        showEditNoteForm: false,
      }
    case otherActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
    }
}
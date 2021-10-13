import { IState } from '../types/state'
import { IAction, actionTypes } from './actions'

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

export const reducer = (state = initialState, action: IAction) : IState => {
    switch (action.type) {
        case actionTypes.GET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
      }
    case actionTypes.CREATE_NOTE:
      return {
        ...state,
        selectNoteId: action.payload.id,
        showCeateNoteForm: false,
        notes: [...state.notes, action.payload],
      }
    case actionTypes.GET_GROUP:
      return {
        ...state,
        groups: [...action.payload],
      }
    case actionTypes.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      }
    case actionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectNoteId: false,
        selectedGroup: 'All',
        showCeateNoteForm: false,
        showEditNoteForm: false,
      }
    case actionTypes.SHOW_CREATE_NOTE_FORM:
      return {
        ...state,
        showCeateNoteForm: true,
        selectedGroup: 'All',
      }
    case actionTypes.SELECT_ACTIVE_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
        selectNoteId: false,
      }
    case actionTypes.SHOW_EDIT_NOTE_FORM:
      return {
        ...state,
        showEditNoteForm: true,
      }
    case actionTypes.SELECT_NOTE:
      return {
        ...state,
        selectNoteId: action.payload,
      }
    case actionTypes.EDIT_SELECT_NOTE:
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
    case actionTypes.DELETE_NOTE:
      const nots = state.notes.filter((note) => note.id !== action.payload)
      return {
        ...state,
        notes: [...nots],
      }
    case actionTypes.SET_USER:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          avatar: action.payload.avatar,
          isLogin: true,
        },
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {
          isLogin: false,
        },
        groups: [],
        notes: []
      }
    case actionTypes.SET_EROR:
      return {
        ...state,
        authError: action.payload,
      }
    case actionTypes.GO_BACK:
      return {
        ...state,
        selectNoteId: false,
        selectedGroup: 'All',
        showCeateNoteForm: false,
        showEditNoteForm: false,
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
    }
}
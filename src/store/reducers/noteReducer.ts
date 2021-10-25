import { IActions } from "../actions/index";
import { INote } from "./../../types/state";
import { NoteActions, noteActionTypes } from "../actions/noteActions";

type NoteState = {
  selectNoteId: number | boolean;
  showCeateNoteForm: boolean;
  showEditNoteForm: boolean;
  notes: INote[];
};

const initialNoteState: NoteState = {
  selectNoteId: false,
  showCeateNoteForm: false,
  showEditNoteForm: false,
  notes: [],
};

export const noteReducer = (
  state = initialNoteState,
  action: IActions
): NoteState => {
  switch (action.type) {
    case noteActionTypes.GET_NOTES:
      return {
        ...state,
        notes: [...action.payload],
      };
    case noteActionTypes.CREATE_NOTE:
      return {
        ...state,
        selectNoteId: action.payload.id,
        showCeateNoteForm: false,
        notes: [...state.notes, action.payload],
      };
    case noteActionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectNoteId: false,
        showCeateNoteForm: false,
        showEditNoteForm: false,
      };
    case noteActionTypes.SHOW_CREATE_NOTE_FORM:
      return {
        ...state,
        showCeateNoteForm: true,
        selectNoteId: false,
      };
    case noteActionTypes.SELECT_ACTIVE_GROUP:
      return {
        ...state,
        selectNoteId: false,
      }
    case noteActionTypes.SHOW_EDIT_NOTE_FORM:
      return {
        ...state,
        showEditNoteForm: true,
      };
    case noteActionTypes.SELECT_NOTE:
      return {
        ...state,
        selectNoteId: action.payload,
      };
    case noteActionTypes.EDIT_SELECT_NOTE:
      const notes = [...state.notes];
      notes.map((note) => {
        const item = note;
        if (action.payload.toFixed) {
          if (item.id === action.payload.id) {
            item.fixed = true;
          }
        } else if (action.payload.toUnFixed) {
          if (item.id === action.payload.id) {
            item.fixed = false;
          }
        } else if (item.id === state.selectNoteId) {
          if (
            action.payload.title &&
            action.payload.text &&
            action.payload.tags
          ) {
            item.title = action.payload.title;
            item.text = action.payload.text;
            item.tags = action.payload.tags;
          }
        }
        return note;
      });
      return {
        ...state,
        notes: [...notes],
        showEditNoteForm: false,
      };
    case noteActionTypes.DELETE_NOTE:
      const nots = state.notes.filter((note) => note.id !== action.payload);
      return {
        ...state,
        notes: [...nots],
      };
    case noteActionTypes.GO_BACK:
      return {
        ...state,
        selectNoteId: false,
        showCeateNoteForm: false,
        showEditNoteForm: false,
      }

    default:
      return state;
  }
};

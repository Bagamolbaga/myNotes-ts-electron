import { INote } from "../../types/state";

export enum noteActionTypes {
  GET_NOTES = "GET_NOTES",
  CREATE_NOTE = "CREATE_NOTE",
  SHOW_ALL_NOTES = "SHOW_ALL_NOTES",
  SHOW_CREATE_NOTE_FORM = "SHOW_CREATE_NOTE_FORM",
  SELECT_NOTE = "SELECT_NOTE",
  SELECT_ACTIVE_GROUP = "SELECT_ACTIVE_GROUP",
  EDIT_SELECT_NOTE = "EDIT_SELECT_NOTE",
  SHOW_EDIT_NOTE_FORM = "SHOW_EDIT_NOTE_FORM",
  DELETE_NOTE = "DELETE_NOTE",
  // SET_LOADING = "SET_LOADING",
  GO_BACK = "GO_BACK",
}

interface createNoteAction {
  type: noteActionTypes.CREATE_NOTE;
  payload: INote;
}

interface getNotesAction {
  type: noteActionTypes.GET_NOTES;
  payload: INote[];
}

interface showAllNoteAction {
  type: noteActionTypes.SHOW_ALL_NOTES;
}

interface showCreateNoteFormAction {
  type: noteActionTypes.SHOW_CREATE_NOTE_FORM;
}

interface showEditFormAction {
  type: noteActionTypes.SHOW_EDIT_NOTE_FORM;
}

interface selectNoteAction {
  type: noteActionTypes.SELECT_NOTE;
  payload: number;
}

// interface setLoadingAction {
//   type: noteActionTypes.SET_LOADING;
//   payload: boolean;
// }

type editNoteObj = {
  title?: string;
  text?: string;
  tags?: string[];
  toFixed?: boolean;
  toUnFixed?: boolean;
  id?: number;
};

interface editNoteAction {
  type: noteActionTypes.EDIT_SELECT_NOTE;
  payload: editNoteObj;
}

interface deleteNoteAction {
  type: noteActionTypes.DELETE_NOTE;
  payload: number;
}

interface selectActiveGroupAction {
  type: noteActionTypes.SELECT_ACTIVE_GROUP;
}

interface goBackAction {
  type: noteActionTypes.GO_BACK;
}

export const createNote = (value: INote): createNoteAction => ({
  type: noteActionTypes.CREATE_NOTE,
  payload: value,
});

export const getNotes = (value: INote[]): getNotesAction => ({
  type: noteActionTypes.GET_NOTES,
  payload: value,
});

export const showAllNote = (): showAllNoteAction => ({
  type: noteActionTypes.SHOW_ALL_NOTES,
});

export const showCreateNoteForm = (): showCreateNoteFormAction => ({
  type: noteActionTypes.SHOW_CREATE_NOTE_FORM,
});

export const showEditForm = (): showEditFormAction => ({
  type: noteActionTypes.SHOW_EDIT_NOTE_FORM,
});

export const selectNote = (id: number): selectNoteAction => ({
  type: noteActionTypes.SELECT_NOTE,
  payload: id,
});

export const editNote = (value: editNoteObj): editNoteAction => ({
  type: noteActionTypes.EDIT_SELECT_NOTE,
  payload: value,
});

export const deleteNote = (id: number): deleteNoteAction => ({
  type: noteActionTypes.DELETE_NOTE,
  payload: id,
});

// export const setLoading = (value: boolean): setLoadingAction => ({
//   type: noteActionTypes.SET_LOADING,
//   payload: value,
// });

export type NoteActions =
  | createNoteAction
  | getNotesAction
  | showAllNoteAction
  | showCreateNoteFormAction
  | showEditFormAction
  | selectNoteAction
  | editNoteAction
  | deleteNoteAction
  // | setLoadingAction
  | selectActiveGroupAction
  | goBackAction;

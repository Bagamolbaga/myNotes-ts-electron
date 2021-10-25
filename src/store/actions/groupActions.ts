import { IGroup } from "../../types/state";

export enum groupActionTypes {
  GET_GROUP = "GET_GROUP",
  CREATE_GROUP = "CREATE_GROUP",
  SELECT_ACTIVE_GROUP = "SELECT_ACTIVE_GROUP",
  SHOW_CREATE_NOTE_FORM = "SHOW_CREATE_NOTE_FORM",
  SHOW_ACTIVE_GROUP = "SHOW_ACTIVE_GROUP",
  // SET_LOADING = "SET_LOADING",
  SHOW_ALL_NOTES = "SHOW_ALL_NOTES",
  GO_BACK = "GO_BACK",
}

interface getGroupsAction {
  type: groupActionTypes.GET_GROUP;
  payload: IGroup[];
}

interface createGroupAction {
  type: groupActionTypes.CREATE_GROUP;
  payload: IGroup;
}

interface selectActiveGroupAction {
  type: groupActionTypes.SELECT_ACTIVE_GROUP;
  payload: number | string;
}

// interface setLoadingAction {
//   type: groupActionTypes.SET_LOADING;
//   payload: boolean;
// }

interface showAllNoteAction {
  type: groupActionTypes.SHOW_ALL_NOTES;
}

interface showCreateNoteFormAction {
  type: groupActionTypes.SHOW_CREATE_NOTE_FORM;
}

interface goBackAction {
  type: groupActionTypes.GO_BACK;
}

export const getGroups = (value: IGroup[]): getGroupsAction => ({
  type: groupActionTypes.GET_GROUP,
  payload: value,
});

export const createGroup = (value: IGroup): createGroupAction => ({
  type: groupActionTypes.CREATE_GROUP,
  payload: value,
});

export const selectActiveGroup = (value: number | string): selectActiveGroupAction => ({
  type: groupActionTypes.SELECT_ACTIVE_GROUP,
  payload: value,
});

// export const setLoading = (value: boolean): setLoadingAction => ({
//   type: groupActionTypes.SET_LOADING,
//   payload: value,
// });

export type GroupActions =
  | getGroupsAction
  | createGroupAction
  | selectActiveGroupAction
  // | setLoadingAction
  | showAllNoteAction
  | showCreateNoteFormAction
  | goBackAction;

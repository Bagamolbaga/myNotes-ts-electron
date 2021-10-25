import { IActions } from "../actions/index";
import { IGroup } from "./../../types/state";
import { GroupActions, groupActionTypes } from "../actions/groupActions";

type GroupState = {
  selectedGroup: string | number | boolean;
  groups: IGroup[];
};

const initialGroupState: GroupState = {
  selectedGroup: "All",
  groups: [],
};

export const groupReducer = (
  state = initialGroupState,
  action: IActions
): GroupState => {
  switch (action.type) {
    case groupActionTypes.GET_GROUP:
      return {
        ...state,
        groups: [...action.payload],
      };
    case groupActionTypes.CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case groupActionTypes.SELECT_ACTIVE_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
        // selectNoteId: false,
      };
    case groupActionTypes.SHOW_ALL_NOTES:
      return {
        ...state,
        selectedGroup: "All",
      }
    case groupActionTypes.SHOW_CREATE_NOTE_FORM:
      return {
        ...state,
        selectedGroup: "All",
      }
    case groupActionTypes.GO_BACK:
      return {
        ...state,
        selectedGroup: "All",
      }

    default:
      return state;
  }
};

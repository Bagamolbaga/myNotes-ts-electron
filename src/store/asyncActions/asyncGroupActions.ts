import { Dispatch } from "redux";
import { GroupActions, createGroup, getGroups } from "../actions/groupActions";
import { OtherActions, setLoading } from "../actions/otherActions";
import { IState } from "../../types/state";
import { socketRef } from "../../http/socket-io";
import API from "../../http/API";

export const createAsyncGroup =
  (title: string) =>
  async (dispatch: Dispatch<GroupActions>, getState: () => IState) => {
    const { user } = getState();
    const res = await API.group.createGroup(title, user);
    if (res.status === 200) {
      dispatch(createGroup(res.data));
      socketRef.emit("newGroup", res.data);
    }
  };

type GroupAndOtherActions = GroupActions | OtherActions;
export const getAsyncGroup =
  () =>
  async (dispatch: Dispatch<GroupAndOtherActions>, getState: () => IState) => {
    const { user } = getState();
    dispatch(setLoading(true));
    const res = await API.group.getGroups(user);
    if (res.status === 200) {
      dispatch(getGroups(res.data));
    }
  };

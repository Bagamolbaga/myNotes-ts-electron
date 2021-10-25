import { IActions } from '../actions/index'
import { UserActions, userActionTypes } from "../actions/userActions";

type UserState = {
  id?: number;
  name?: string;
  avatar?: string;
  authError?: string;
  isLogin: boolean;
};

const initialUserState: UserState = {
  isLogin: false,
};

export const userReducer = (
  state = initialUserState,
  action: IActions
): UserState => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        id: action.payload.id,
        name: action.payload.name,
        avatar: action.payload.avatar,
        isLogin: true,
      };
    case userActionTypes.LOGOUT:
      return {
        isLogin: false,
      };
    case userActionTypes.SET_EROR:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
};

export enum otherActionTypes {
  SET_EROR = "SET_EROR",
  GO_BACK = "GO_BACK",
  SET_LOADING = "SET_LOADING",
}

interface setAuthErrorAction {
  type: otherActionTypes.SET_EROR;
  payload: string;
}

interface goBackAction {
  type: otherActionTypes.GO_BACK;
}

interface setLoadingAction {
  type: otherActionTypes.SET_LOADING;
  payload: boolean;
}

export const setAuthError = (value: string): setAuthErrorAction => ({
  type: otherActionTypes.SET_EROR,
  payload: value,
});

export const goBack = (): goBackAction => ({
  type: otherActionTypes.GO_BACK,
});

export const setLoading = (value: boolean): setLoadingAction => ({
  type: otherActionTypes.SET_LOADING,
  payload: value,
});

export type OtherActions = setAuthErrorAction | goBackAction | setLoadingAction;

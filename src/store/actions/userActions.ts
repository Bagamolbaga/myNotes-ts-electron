import { IUser } from '../../types/state'

export enum userActionTypes {
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
    SET_EROR = 'SET_EROR',
}

interface setUserAction {
    type: userActionTypes.SET_USER
    payload: IUser
}

interface logoutUserAction {
    type: userActionTypes.LOGOUT
}

interface setAuthErrorAction {
    type: userActionTypes.SET_EROR
    payload: string
}

export const setUser = (value: IUser) : setUserAction  => ({
    type: userActionTypes.SET_USER,
    payload: value,
})

export const logoutAction = () : logoutUserAction => ({
    type: userActionTypes.LOGOUT,
})

export const setAuthError = (value: string) : setAuthErrorAction => ({
    type: userActionTypes.SET_EROR,
    payload: value,
  })

export type UserActions = setUserAction | logoutUserAction | setAuthErrorAction
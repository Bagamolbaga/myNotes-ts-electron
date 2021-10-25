import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { groupReducer } from './groupReducer'
import { noteReducer } from './noteReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    group: groupReducer,
    note: noteReducer,
})
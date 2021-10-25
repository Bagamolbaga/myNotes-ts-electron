import { UserActions } from './userActions'
import { GroupActions } from './groupActions'
import { NoteActions } from './noteActions'
import { OtherActions } from './otherActions'

export type IActions = UserActions | GroupActions | NoteActions | OtherActions

export { userActionTypes } from './userActions'
export { groupActionTypes } from './groupActions'
export { noteActionTypes } from './noteActions'
export { otherActionTypes } from './otherActions'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer } from './reducer'

// import { rootReducer } from './reducers/index'

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export type rootState = ReturnType<typeof reducer>
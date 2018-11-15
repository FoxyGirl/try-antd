

/*
import React from 'react'
import ReacDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'

import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
*/
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from './ducks'

export const history = createBrowserHistory()

let store

const configureStore = () => {
    const middlewares = [routerMiddleware(history), thunk]
    const enhancers = composeWithDevTools(applyMiddleware(...middlewares))
    store = createStore(createRootReducer(history), compose(enhancers));
    return store
}

export const dispatch = (action) => {
    return store.dispatch(action)
}

export default configureStore


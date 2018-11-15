import { createAction, createReducer } from 'redux-act'
import axios from 'axios'

export const REDUCER = "BASKET"

const NS = `${REDUCER}__`
const API  = 'http:// localhost: 4000/'

const initialState = {
    items: [],
    isLoading: false,
    error: ''
}

const reducer = createReducer({}, initialState)

const readRequest = createAction(`${NS}READ_REQUEST`)
reducer.on(readRequest, state => ({
    ...state,
    isLoading: true,
    error: ''
}))
    

const readSuccess = createAction(`${NS}READ_SUCCESS`)
reducer.on(readSuccess, (state, items) => ({
    ...state,
    items: [...items],
    isLoading: false,
}))

const readFailure = createAction(`${NS}READ_FAILURE`)
reducer.on(readFailure, (state, error) => ({
    ...state,
    isLoading: false,
    error
}))

export const read = () => (dispatch) => {
    dispatch(readRequest())
    return axios
        .get(`${API}basket/`)
        .then(response => {
            dispatch(readSuccess(response.data.basket));
        } )
        .catch(error => {
            dispatch(readFailure(error))
            return Promise.reject(error)
        })
}

export default reducer


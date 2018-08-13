import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import {SERVER_URL} from './constants';
import {store} from './store';
export const SET_DISTRICT = 'SET_DISTRICT';
export const LOAD_RECORDS = 'LOAD_RECORDS';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const REMOVE_RECORDS = 'REMOVE_RECORDS';
export const SERVER_ERR = 'SERVER_ERR';


// change this??? push to router!
export function setDistrict(district) {
  return (dispatch, getState) => {
    dispatch({ type: SET_DISTRICT, district })
    dispatch(removeRecords())
    dispatch(loadRecords())
  }
}

export function removeRecords() {
  return { type: REMOVE_RECORDS }
}

export function loadRecords(district) {
  return (dispatch, getState) => {
    const state = getState()
    const qs = querystring.stringify({
      district: district
    })
    return fetch(`${SERVER_URL}/messages?${qs}`)
      .then(res => {
        if (res.status === 200) return res.json()
        if (res.status === 404) {
          return []
        }
        return res.text().then(t => {throw new Error(t)})
      })
      .then(records => {
        dispatch({
          type: LOAD_RECORDS,
          records
        })
      })
      .catch(err => {
        console.error(err.message)
        dispatch({ type: SERVER_ERR, err: err })
      })
  }
}

export function submitEvent(id, event, record, updates) {
  return (dispatch, state) => {
    return fetch(`${SERVER_URL}/messages/event`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event, record, updates })
    })
      .then(res => store.distpatch(loadRecords()))
      .catch(err => store.dispatch(loadRecords()))
  }
}

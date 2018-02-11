import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import {SERVER_URL} from './constants';
import {store} from './store';
export const LOAD_RECORDS = 'LOAD_RECORDS';
export const UPDATE_RECORD = 'UPDATE_RECORD';
export const REMOVE_RECORD = 'REMOVE_RECORD';

export function loadRecords(start) {
  return (dispatch, state) => {
    const qs = querystring.stringify({
      start: start || 0
    })
    return fetch(`${SERVER_URL}/messages?${qs}`) // add start + 20 or something?
      .then(res => res.json())
      .then(records => {
        dispatch({
          type: LOAD_RECORDS,
          records
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function removeRecord(_id) {
  return { type: REMOVE_RECORD, id: _id }
}

export function submitUpdate(_id, {notes, code, called}) {
  return (dispatch, state) => {
    dispatch({ type: REMOVE_RECORD, id: _id })
    const conf = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ called })
    }
    return fetch(`${SERVER_URL}/messages/${_id}`, conf)
      .then(res => store.distpatch(loadRecords()))
      .catch(err => store.dispatch(loadRecords()))
  }
}

export function submitAttempt(id) {
  return (dispatch, state) => {
    dispatch({ type: REMOVE_RECORD, id: id })
    return fetch(`${SERVER_URL}/messages/${id}/attempt`, { method: 'POST'})
      .then(res => store.distpatch(loadRecords()))
      .catch(err => store.dispatch(loadRecords()))
  }
}

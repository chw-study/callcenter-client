import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import {SERVER_URL} from './constants';

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
  }
}

export function submitUpdate(_id, {notes, code, called}) {
  return (dispatch, state) => {
    if ((!!called && !code) || (!called && !!code)) {
      return
    }
    dispatch({ type: REMOVE_RECORD, id: _id })
    const conf = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({notes, code, called})
    }
    return fetch(`${SERVER_URL}/messages/${_id}`, conf)
      .then(res => res.json())
      .then(record => {
        loadRecords();
      })
  }
}

export function submitAttempt(id) {
  return (dispatch, state) => {
    dispatch({ type: REMOVE_RECORD, id: id })
    return fetch(`${SERVER_URL}/messages/${id}/attempt`, { method: 'POST'})
      .then(res => res.json())
      .then(records => {
         loadRecords();
      })
  }
}

import fetch from 'isomorphic-fetch';
import {SERVER_URL} from './constants';

export const LOAD_RECORDS = 'LOAD_RECORDS';

export function loadRecords(start) {
  return (dispatch, state) => {
    return fetch(`${SERVER_URL}/messages`) // add start + 20 or something?
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
    const conf = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({notes, code, called})
    }
    console.log(conf)
    return fetch(`${SERVER_URL}/messages/${_id}`, conf)
      .then(res => res.json())
      .then(record => {
        console.log(record)
        // dispatch something
      })
  }
}

export function submitAttempt(id) {
  return (dispatch, state) => {
    return fetch(`${SERVER_URL}/messages/${id}/attempt`, { method: 'POST'})
      .then(res => res.json())
      .then(records => {
        console.log(records)
        //dispatch something
      })
  }
}

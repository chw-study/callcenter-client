import {SERVER_ERR, LOAD_RECORDS, UPDATE_RECORD, REMOVE_RECORDS, SET_DISTRICT} from './actions';
import _ from 'lodash';

import {OrderedMap} from 'immutable';

function records(state = OrderedMap(), action) {
  switch (action.type) {
  case REMOVE_RECORDS:
    return OrderedMap()
  case LOAD_RECORDS:

    // Support API returning null
    if (!action.records) return state

    // support array and singular returns from API
    if (!Array.isArray(action.records)) {
      action.records = [action.records]
    }
    return OrderedMap(action.records.map(r => [r._id, r]));

  default:
    return state;
  }
}

function errors(state = null, action) {
  switch (action.type) {
  case SERVER_ERR:
    return action.err
  default:
    return state
  }
}

export default { records, errors };

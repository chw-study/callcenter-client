import {SERVER_ERR, LOAD_RECORDS, UPDATE_RECORD, REMOVE_RECORD} from './actions';
import _ from 'lodash';

import {OrderedMap} from 'immutable';

function records(state = OrderedMap(), action) {
  switch (action.type) {
  case REMOVE_RECORD:
    return state.remove(action.id)
  case LOAD_RECORDS:
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

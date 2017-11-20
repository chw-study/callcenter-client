import {LOAD_RECORDS} from './actions';

const initialRecords = [
  {
    _id: 'foo',
    timestamp: Date.now(),
    phone: 123,
    worker: 'John Harris',
    workerId: 'bar',
    called: false,
    attempts: [Date.now()]
  },
  {
    _id: 'baz',
    timestamp: Date.now(),
    phone: 123,
    worker: 'Maniv Horsikens',
    workerId: 'baz',
    called: false
  }
]

function records(state = initialRecords, action) {
  switch (action.type) {
  case LOAD_RECORDS:
    return action.records;
  default:
    return state;
  }
}

export default { records };

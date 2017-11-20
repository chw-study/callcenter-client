import {getCurrent} from './utils'
import _ from 'lodash';

const minutes = (i) => 1000 * 60 * i;

describe('getCurrent', () => {
  const records = [
    { _id: 'foo', called: true, attempted: [{ '$date': Date.now() - minutes(1) }]},
    { _id: 'bar', called: false, attempted: [{ '$date': Date.now() - minutes(10) }]},
    { _id: 'bar', called: false, attempted: [{ '$date': Date.now() - minutes(65) }]},
    { _id: 'baz', called: false},
    { _id: 'baz', called: false}
  ]

  it('gets the current', (() => {
    const current = getCurrent(records, 1);
    expect(current).toEqual([_.values(_.pick(records, [2,3,4]))])
    console.log(true)
  }))
})

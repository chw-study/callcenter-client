import {submitUpdate} from './actions';
import fetch from 'isomorphic-fetch';
import {SERVER_URL} from './constants';

jest.mock('isomorphic-fetch');

test('submitUpdate calls the server endpoints in turn', () => {
  const fn = submitUpdate('foo', {called: true})
  fetch
    .mockReturnValueOnce(new Promise((resolve, reject) => {
      resolve();
    }))
    .mockReturnValueOnce(new Promise((resolve, reject) => {
      resolve({ json: () => ['foo']})
    }))

  const dispatch = jest.fn();
  return fn(dispatch).then(() => {
    expect(fetch).toHaveBeenCalledWith(SERVER_URL + "/messages/foo", expect.anything());
    expect(fetch).toHaveBeenCalledWith(SERVER_URL + "/messages?start=0",);
  })
});


test('submitUpdate works with erroring fetch', () => {
  const fn = submitUpdate('foo', {called: true})
  fetch
    .mockReturnValue(new Promise((resolve, reject) => {
      reject(new Error('foo'))
    }))

  const dispatch = jest.fn();
  return fn(dispatch).then(() => {
    expect(fetch).toHaveBeenCalledWith(SERVER_URL + "/messages/foo", expect.anything());
    expect(fetch).toHaveBeenCalledWith(SERVER_URL + "/messages?start=0",);
  })
});

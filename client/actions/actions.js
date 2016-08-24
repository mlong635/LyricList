import axios from 'axios';

export const FETCH_SONGS = 'FETCH_SONGS';

export function fetchSongs(){
  const url = '/database/allTests';
  const request = axios.get(url);
  return {
    type: FETCH_SONGS,
    payload: request,
  };
}
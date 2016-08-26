import { FETCH_SONGS, FETCH_SONG, EDIT_SONG } from '../actions/actions';

const INITIAL_STATE = { all: [], song: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SONG:
      return { song: action.payload.data };
    case FETCH_SONGS:
      // return { ...state, all: action.payload.data };  // this kept throwing errors so I switched to the next line
      return { all: action.payload.data };
    case EDIT_SONG:
      return { song: action.payload.data };
    default: 
      return state;
  }
}
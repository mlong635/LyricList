import { FETCH_SONGS, FETCH_SONG, EDIT_SONG, SUBMIT_LOGIN, FETCH_USER_PROFILE, SAVE_USER_PROFILE } from '../actions/actions';

// const INITIAL_STATE = { username: null, songs: [] };
const INITIAL_STATE = { userProfile: null };


export default function(state = INITIAL_STATE, action) {
  console.log("reducer_songs state", state);
  switch(action.type) {
    // case FETCH_SONG:
    //   return { song: action.payload.data };
    // case FETCH_SONGS:
    //   // return { ...state, all: action.payload.data };  // this kept throwing errors so I switched to the next line
    //   return { all: action.payload.data };
    // case EDIT_SONG:
    //   return { song: action.payload.data };
    case FETCH_USER_PROFILE:
      return { userProfile: action.payload.data };
    case SAVE_USER_PROFILE:
      return { userProfile: action.payload.data };
    default: 
      return state;
  }
}
import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  songs: SongsReducer,
  form: formReducer
});

export default rootReducer;
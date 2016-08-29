import { combineReducers } from 'redux';
import SongsReducer from './reducer_songs';
import UsersReducer from './reducer_users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  users: UsersReducer,
  songs: SongsReducer,
  form: formReducer
});

export default rootReducer;
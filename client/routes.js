import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SongsIndex from './components/songs_index';
import UserSongsIndex from './components/user_songs_index';
import SongsNew from './components/songs_new';
import SongsShow from './components/songs_show';
import SongsEdit from './components/songs_edit';
import Login from './components/login';
import CreateAccount from './components/create_account';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SongsIndex} />
    <Route path="/login" component={Login} />
    <Route path="/createaccount" component={CreateAccount} />
    <Route path="/songs/new" component={SongsNew} />
    <Route path="/songs/:title" component={SongsShow} />
    <Route path="/songs/edit/:id" component={SongsEdit} />
    <Route path="/user/*" component={UserSongsIndex} />
  </Route>
);


import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SongsIndex from './components/songs_index';
import SongsNew from './components/songs_new';
import SongsShow from './components/songs_show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SongsIndex} />
    <Route path="/songs/new" component={SongsNew} />
    <Route path="/songs/:id" component={SongsShow} />
  </Route>
);
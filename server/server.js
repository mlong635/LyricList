const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('../webpack.dev.config');
const compiler = webpack(config);
const app = express();
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
    },
  }));
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
} else {
  app.use(express.static(path.resolve(__dirname, './../dist')));
}

app.use(bodyParser.json());
app.use(router);

router.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, './../index.html'));
  console.log('LyricList is connecting to index.html');
});


app.listen(process.env.PORT || 8080, function(){
  console.log('LyricList is listening on port 8080');
});

module.express = app;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = express.Router();

router.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, './index.html'));
  console.log('connecting to index.html');
});

app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT || 8080, function(){
  console.log('LyricList is listening on port 8080');
});

module.express = app;
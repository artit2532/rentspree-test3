
const express = require('express');
const app = express();

require('./routes')(app);

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

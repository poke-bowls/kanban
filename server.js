"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

// app.get('/api/cards', function (req, res){
//   res.json(cards);
// });

app.get('*', function (req, res){
  res.sendFile('/public/index.html', { root : __dirname });
});

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});
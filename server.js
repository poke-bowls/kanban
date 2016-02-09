"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;





app.use(express.static('./public'));

app.listen(PORT, function(){
  process.stdout.write(`server listening on port ${PORT}`);
});
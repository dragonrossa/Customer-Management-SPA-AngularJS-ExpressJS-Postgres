const express = require('express')
var path = require('path');
const app = express()
const port = 3000

var postRouter = require('./routes/api')

app.use('/', postRouter);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const port = 3000;

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, function () {
    console.log(`app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fetch = require('node-fetch');
const translate = require('./translate.js');

const app = express()
const port = 3000;

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})

app.get("/api", (req, res) => {
    fetch(`https://api.meaningcloud.com/sentiment-2.1?url=${req.query.url}&key=${process.env.API_KEY}`)
        .then(data => data.json())
        .then(data => {
            if (data.status.msg != "OK") {
                res.send(data.status);
            }
            else {
                res.send(translate(data));
            }
        })
        .catch(err => res.send(err));
});

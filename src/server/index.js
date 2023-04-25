const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const fetch = require('node-fetch');

async function getFromUrl (url,key) {
    return await fetch(`https://api.meaningcloud.com/sentiment-2.1?url=${url}&key=${key}`).then(res => res.json());
}

const app = express()
const port = 3000;

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})

app.get("/api", (req, res) => {
    fetch(`https://api.meaningcloud.com/sentiment-2.1?url=${req.query.url}&key=${process.env.API_KEY}`)
        .then(data => data.json())
        .then(data => res.send(data))
        .catch(err => res.send(err));
});

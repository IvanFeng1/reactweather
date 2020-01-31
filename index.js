const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }))
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.get('/api/', (request, response) => {
    console.log("request")
    // const api_key = '3d0cf5aa23b128c122fc7588b928d1b5'
    // const city = 'toronto'
    // const api_url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},CA&mode=json&appid=${api_key}`
    // const rawResp = await fetch(api_url)
    // const data = await rawResp.json()
    // response.json(data)
})
app.listen(port, () => console.log(`Listening at port ${port}`))

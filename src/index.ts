import * as express from'express';
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => {
    let data;
    fetch('http://api.tvmaze.com/search/shows?q=girls')
        .then(response => response.json())
        .then((movies) => {
            data = movies.map((i) => {
                return {id: i.show.id, name: i.show.name}
            });
            return fetch(`http://api.tvmaze.com/shows/${data[0].id}/cast`);
        })
        .then((cast) => {
            return cast.text()
            // return JSON.stringify(data);
        })
        .then((cast) => {
            const fullResponse = cast;
            res.setHeader('Content-Type', 'application/json');
            res.send(fullResponse);
        })
        .catch((err) => {
            console.log('error: ', err)
        })
});

app.listen(3000, () => console.log('App listening on port 3000!'));
import * as express from 'express';

const fetch = require('node-fetch');
const app = express();

app.get('/', async (req, res) => {
    // getting the list of movies
    const response = await fetch('http://api.tvmaze.com/search/shows?q=girls');
    const movies = await response.json();
    const data = await movies.map((itemMovie) => ({id: itemMovie.show.id, name: itemMovie.show.name}));


    // getting corresponding actors:
    const casts = await data.map(async (movie) => {
        const response2 = await fetch(`http://api.tvmaze.com/shows/${movie.id}/cast`);
        const cast = await response2.json();
        return {...movie, cast: cast.map(c => ({id: c.id}))};
    });

    //merging movies with cast:

    

    await Promise.all([casts]);

    res.setHeader('Content-Type', 'application/json');
    res.send(casts);
});

app.listen(3000, () => console.log('App listening on port 3000!'));
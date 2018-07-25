import * as express from 'express';
import { RtlApi } from './mazeApi';
const app = express();

app.get('/', async (req, res) => {
    const rtlApi = new RtlApi('http://api.tvmaze.com');
    const casts = await rtlApi.getShows();

    res.setHeader('Content-Type', 'application/json');
    res.send(casts);
});

app.listen(3000, () => console.log('App listening on port 3000!'));
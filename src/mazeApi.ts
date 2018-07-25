import fetch from 'node-fetch'
import { ApiRequest } from './requestApi';

export interface MoviesResponse {
    name: string;
    id: number;
}

export interface CastResponse {
    person: {
        id: number,
        name: string,
        birthday: string
    }
}

export interface MoviesAndCast {
    name: string;
    id: number;
    cast: {
        id: number,
        name: string,
        birthday: string
    }[];
}

export class RtlApi {
    constructor(private url: string) { }
    private getData<T>(path: string):Promise<T> {
        return new Promise((resolve, reject) => {
            function tryAgian(counter: number):void{
                ApiRequest.get(path)
                    .then(resolve)
                    .catch(err => {
                        if (err.statusCode === 429 && counter !== 0) {
                            tryAgian(counter--)
                        } else {
                            reject(err);
                        }
                    })
            }
        })
    }

    public async getShows(): Promise<MoviesAndCast[]> {
        const data = await this.getData<CastResponse[]>(this.url+'/shows');
        const casts = data.map((movie) => {
            return this.getData<CastResponse[]>(`${this.url}/shows/${movie.id}/cast`)
                .then((item) => {
                    let cast = item.map((actor) => {
                        return {
                            id: actor.person.id,
                            name: actor.person.name,
                            birthday: actor.person.birthday,
                        }
                    });

                    return {
                        id: movie.id,
                        name: movie.name,
                        cast
                    }
                }
            })
        })
    }

}

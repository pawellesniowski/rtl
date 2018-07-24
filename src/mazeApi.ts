import fetch from 'node-fetch'

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
    MoviesResponse;
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
            function recursive(counter: number){
                fetch(path)
            }
        })
    }

}

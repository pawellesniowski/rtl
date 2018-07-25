import { get, IncomingMessage } from "http";

export class resErrorHandler extends Error {
    constructor (public err: number) {
        super();
        this.message = "Error" + err
    }
}

export class reqErrorHandler extends Error {
    constructor(public err: any){
        super();
        this.message = "Error" + err;
    }
}

export class ApiRequest {
    static get<T>(path):Promise<T> {
        return new Promise((resolve, reject) => {
            get(path, (response: IncomingMessage) => {
                const resCode = response.statusCode;
                if(resCode !== 200) {
                    reject(new resErrorHandler(resCode));
                    response.resume();
                    return;
                }
                response.setEncoding('utf8');
                let receivedData:string = '';
                response.on('data', (chunk) => receivedData += chunk);
                response.on('end', () => resolve(JSON.parse(receivedData)));
            }).on('error', e => {
                reject(new reqErrorHandler(e));
            });
        });
    }
}
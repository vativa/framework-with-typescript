import axios, { AxiosPromise } from 'axios';

interface HasId {
    id?: number;
}

export class ApiSync<T extends HasId> {
    protected _url: string;

    public constructor(url: string) {
        this._url = url;
    }

    public fetch(id: number): AxiosPromise<T> {
        return axios(`${this._url}/${id}`);
    }

    public save({ id, ...data }: T): AxiosPromise<T> {
        return id
            ? axios.put(`${this._url}/${id}`, data)
            : axios.post(this._url, data);
    }
}

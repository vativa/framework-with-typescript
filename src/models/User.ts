import axios from 'axios';
import { Eventing } from './Eventing';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const url: string = 'http://localhost:3000/users';

export class User {
    private _data: UserProps;
    protected _events: Eventing = new Eventing();

    public get events(): Eventing {
        return this._events;
    }

    public constructor(data: UserProps) {
        this._data = data;
    }

    public get(propName: string): string | number {
        return this._data[propName];
    }

    public set(props: UserProps): User {
        this._data = { ...this._data, ...props };
        return this;
    }

    public fetch(): Promise<UserProps> {
        return axios(`${url}/${this.get('id')}`).then(({ data }) => {
            // console.log(data);
            this.set(data);
            return data;
        }).catch(console.error);
    }

    public save(): Promise<UserProps> {
        const id = this.get('id');
        if (id) {
            return axios.put(`${url}/${id}`, this._data).then(({ data }) => {
                // console.log(data);
                return data;
            }).catch(console.error);
        } else {
            return axios.post(url, this._data).then(({ data }) => {
                // console.log(data);
                return data;
            }).catch(console.error);
        }
    }
}

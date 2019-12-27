import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

type Deserializable<T, S> = (json: S) => T;

export class Collection<T, S> {
    protected _models: T[] = [];
    protected _events: Eventing = new Eventing();

    public constructor(
        protected _url: string,
        protected _deserialize: Deserializable<T, S>
    ) {
    }

    public get models(): T[] {
        return this._models;
    }

    public get on() {
        return this._events.on;
    }

    public get trigger() {
        return this._events.trigger;
    }

    public fetch(): void {
        axios.get(this._url).then((response: AxiosResponse): void => {
            response.data.forEach((props: S): void => {
                this._models.push(this._deserialize(props));
            });
            this.trigger('fetch');
        }).catch(console.error);
    }
}

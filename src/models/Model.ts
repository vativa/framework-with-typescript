import { AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

interface HasId {
    id?: number;
}

interface Modelable<T> {
    data: T;
    set(props: T): void;
    get<K extends keyof T>(key: K): T[K];
}

interface Syncable<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Eventable {
    on(eventName: string, callback: Callback ): void;
    trigger(eventName: string): void;
}

export abstract class Model<T extends HasId> {

    protected constructor(
        private _attributes: Modelable<T>,
        private _events: Eventable,
        private _sync: Syncable<T>
    ) {}

    // 1st group of delegates
    on = this._events.on;
    trigger = this._events.trigger;
    get = this._attributes.get;

    // 2nd group of delegates
    public set(props: T): void {
        this._attributes.set(props);
        this._events.trigger('change');
    }

    public fetch(): void {
        const id = this.get('id');
        if (typeof id === 'undefined') {
            throw new Error("Cannot fetch without ID");
        }
        this._sync.fetch(id).then((response: AxiosResponse<T>): void => {
            this._attributes.set(response.data);
            this._events.trigger('fetch');
        }).catch(console.error);
    }

    public save(): void {
        this._sync.save(this._attributes.data).then((response: AxiosResponse): void => {
            this.trigger('save');
        }).catch(() => {
            this.trigger('error');
        });
    }
}

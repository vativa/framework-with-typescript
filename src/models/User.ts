export interface UserProps {
    name?: string;
    age?: number;
}

interface Event {
    [key: string]: Callback[];
}

// Type alias
type Callback = () => void;

export class User {
    private _data: UserProps;
    private _events: Event = {};

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

    public on(eventName: string, callback: Callback): void {
        const handlers = this._events[eventName] || [];
        this._events[eventName] = [...handlers, callback];
    }

    public trigger(eventName: string): User {
        const handlers = this._events[eventName];
        if (!handlers || handlers.length === 0) {
            return this;
        }
        handlers.forEach(callback => {
            callback();
        })
        return this;
    }

    public fetch(): Promise<string[]> {
        return new Promise(() => {}, () => {});
    }

    // public save(): Promise;
}

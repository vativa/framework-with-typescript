export class Attributes<T> {
    private _data: T;

    public get data(): T {
        return this._data;
    }

    public constructor(data: T) {
        this._data = data;
    }

    public set = (props: T): void => {
        this._data = { ...this._data, ...props };
    };

    public get = <K extends keyof T>(key: K): T[K] => {
        return this._data[key];
    };
}

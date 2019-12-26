interface Event {
    [key: string]: Callback[];
}

// Type alias
type Callback = () => void;

export class Eventing {
    private _events: Event = {};

    public on(eventName: string, callback: Callback): void {
        const handlers = this._events[eventName] || [];
        this._events[eventName] = [...handlers, callback];
    }

    public trigger(eventName: string): void {
        const handlers = this._events[eventName];
        if (!handlers || handlers.length === 0) {
        }
        handlers.forEach(callback => {
            callback();
        })
    }
}

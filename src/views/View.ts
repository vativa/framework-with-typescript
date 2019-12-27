import { Model } from '../models/Model';

export abstract class View<T extends Model<S>, S> {
    protected _regions: { [key: string]: Element } = {};

    public constructor(
        protected _parent: Element,
        protected _model: T
    ) {
        this.bindModel();
    }

    protected abstract template(): string;

    protected eventsMap(): { [key: string]: () => void } {
        return {};
    }

    protected regionMap(): { [key: string]: string } {
        return {};
    }

    protected mapRegions(fragment: DocumentFragment): void {
        const regionMap = this.regionMap();
        for (let key in regionMap) {
            const selector = regionMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this._regions[key] = element;
            }
        }
    }

    // Listen for change events
    protected bindModel(): void {
        this._model.on('change', () => {
            this.render();
        });
    }

    protected bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    protected onRender(): void {}

    public render(): void {
        this._parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        // View nesting
        this.onRender();

        this._parent.append(templateElement.content);
    }
}


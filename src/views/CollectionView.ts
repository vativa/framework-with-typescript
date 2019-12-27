import { Collection } from '../models/Collection';
import { Model } from '../models/Model';

export abstract class CollectionView<T, S> {

    public constructor(
        protected _parent: HTMLElement,
        protected _collection: Collection<T, S>
    ) {}

    protected abstract renderItem(model: T, parentItem: HTMLElement): void;

    public render(): void {
        // Clear out all the html elements inside
        this._parent.innerHTML = '';
        // Create a template element
        const templateElement = document.createElement('template');
        // Iterate through all the different models inside collection
        for (let model of this._collection.models) {
            const parentItem = document.createElement('div');
            this.renderItem(model, parentItem);
            templateElement.content.append(parentItem);
        }
        // Attach to parent
        this._parent.append(templateElement.content);
    }
}

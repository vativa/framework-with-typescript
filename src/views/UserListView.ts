import { Collection as ModelCollection } from '../models/Collection';
import { Collection as ViewCollection } from './Collection';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserListView extends ViewCollection<User, UserProps> {
    public constructor(parent: HTMLElement, collection: ModelCollection<User, UserProps>) {
        super(parent, collection);
    }

    protected renderItem(model: User, parentItem: HTMLElement): void {
        new UserShow(parentItem, model).render();
    }
}

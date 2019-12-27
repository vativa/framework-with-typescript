import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserListView extends CollectionView<User, UserProps> {
    protected renderItem(model: User, parentItem: HTMLElement): void {
        new UserShow(parentItem, model).render();
    }
}

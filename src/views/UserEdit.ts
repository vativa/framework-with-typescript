import { View } from './View';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { User, UserProps } from '../models/User';

export class UserEdit extends View<User, UserProps> {

    protected regionMap(): { [key: string]: string } {
        return {
            'userShow': '#user-show-region',
            'userForm': '#user-form-region'
        };
    }

    // Nesting views
    protected onRender(): void {
        new UserShow(this._regions.userShow, this._model).render();
        new UserForm(this._regions.userForm, this._model).render();
    }

    protected template(): string {
        return `
            <div>
                <div id="user-show-region"></div>
                <br>
                <div id="user-form-region"></div>
            </div>
        `;
    }
}

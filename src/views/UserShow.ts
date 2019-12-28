import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
    protected template(): string {
        return `
        <div style="width: 200px; display: flex; justify-content: space-between;">
            <div>${this._model.get('name')}</div>
            <div>${this._model.get('age')}</div>
        </div>
        `;
    }
}

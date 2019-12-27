import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
    protected template(): string {
        return `
            <div>
                <h1>User Details</h1>
                <div>User name: ${this._model.get('name')}</div>
                <div>User age: ${this._model.get('age')}</div>
            </div>
        `;
    }
}

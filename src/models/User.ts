import { Model } from './Model';
import { UserProps } from './UserProps';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';

export class User extends Model<UserProps> {
    public static factory(attr: UserProps): User {
        return new User(
            new Attributes<UserProps>(attr),
            new Eventing(),
            new ApiSync<UserProps>('http://localhost:3000/users')
        );
    }
}

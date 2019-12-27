import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';
import { AxiosPromise } from 'axios';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class User extends Model<UserProps> {

    public static factory(attr: UserProps): User {
        return new User(
            new Attributes<UserProps>(attr),
            new Eventing(),
            new ApiSync<UserProps>('http://localhost:3000/users')
        );
    }

    public static getUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            'http://localhost:3000/users',
            (json: UserProps): User => User.factory(json)
        );
    }

    // public static all(): AxiosPromise<Collection<User, UserProps>> {}

    public setRandomAge(): void {
        const age = Math.round(Math.random() * 100);
        this.set({ age });
    }
}

import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {

    protected eventsMap(): { [key: string]: () => void } {
        return {
            'click:button': this.handleClick,
            'mouseover:h1': this.handleHover,
            'focus:input': this.handleInputFocus,
            'blur:input': this.handleInputBlur,
            'click:.set-age': this.handleSetAge,
            'click:.set-name': this.handleSetName,
            'click:.persist': this.handlePersist
        };
    }

    protected handleClick(): void {
        console.log('button clicked');
    }

    protected handleHover(): void {
        console.log('mouse over');
    }

    protected handleInputFocus(): void {
        console.log('input focused');
    }

    protected handleInputBlur(): void {
        console.log('input blured');
    }

    protected handleSetAge = (): void => {
        console.log('set random age triggered');
        this._model.setRandomAge();
    };

    protected handleSetName = (): void => {
        console.log('set name triggered');
        const input = this._parent.querySelector('input#name') as HTMLInputElement;
        if (input) {
            const name = input.value;
            this._model.set({ name });
        }
    };

    protected handlePersist = (): void => {
        console.log('persist model triggered');
        this._model.save();
    };

    protected template(): string {
        return `
            <div>
                <input id="name" name="name" type="text" placeholder="${this._model.get('name')}" />
                <button id="submit" class="set-name">Change name</button>
                <button class="set-age">Set random age</button>
                <button class="persist">Persist</button>
            </div>
        `;
    }
}

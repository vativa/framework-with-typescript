import { User } from './models/User';

const user = new User({ name: 'Tichomir Rangelov', age: 41 });

console.log(`${user.get('name')} ${user.get('age')}`);
user.set({ name: 'Tim Range', age: 50 });
console.log(`${user.get('name')} ${user.get('age')}`);
user.set({ age: 30 });
console.log(`${user.get('name')} ${user.get('age')}`);

// Test events
user.on('change', () => {
    console.log('>>> trigger the change event');
});
user.on('click', () => {
    console.log('>>> trigger click#1 event');
});
user.on('click', () => {
    console.log('>>> trigger click#2 event');
});
user.trigger('click');
user.trigger('change');
user.trigger('unknown');

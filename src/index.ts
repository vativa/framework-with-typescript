import { User } from './models/User';

// const user = new User({ id: 1, name: 'Joseph Bonano', age: 78 });
const user = User.factory({ id: 1 });

// Listen for events
user.on('fetch', () => {
    console.log('User has been successfully fetched.');
    console.log(user);
});
user.on('change', () => {
    console.log('User has changed.');
    console.log(user);
})
user.on('save', () => {
    console.log('User has been saved.');
    console.log(user);
})
user.on('error', () => {
    console.log('Ups! Something went wrong...');
})

// Test framework API
user.fetch();
user.set({ name: "Jeremy Stones", age: 34 });
user.save();

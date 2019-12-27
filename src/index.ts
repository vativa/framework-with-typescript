import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';
import { UserEdit } from './views/UserEdit';
import { UserListView } from './views/UserListView';

const users = new Collection(
    'http://localhost:3000/users',
    (json: UserProps): User => User.factory(json)
);
users.on('fetch', () => {
    // Render to the DOM
    const root = document.getElementById('root');
    if (root) {
        const view = new UserListView(root, users);
        view.render();
        console.log(view);
    }
});
users.fetch();


// if (root) {
//     const view = new UserEdit(
//         root,
//         User.factory({ name: 'Lyonel Ritchie', age: 53 })
//     );
//     view.render();
    // console.log(view);
// } else {
//     throw new Error("Root element has not been found.");
// }

// axios.get('http://localhost:3000/users').then(({ data }) => console.log(data)).catch(console.error);

// const collection = User.getUserCollection();
// collection.on('fetch', () => {
//     console.log(`User collection has been fetched. [${collection.models.length}]`);
//     console.log(collection.models);
// });
// collection.fetch();

// User.all().then((collection: Collection<User, UserProps>) => {
//     console.log(collection);
// }).catch(console.error);

// const user = new User({ id: 1, name: 'Joseph Bonano', age: 78 });
// const user = User.factory({ id: 1 });

// Listen for events
// user.on('fetch', () => {
//     console.log('User has been successfully fetched.');
//     console.log(user);
// });
// user.on('change', () => {
//     console.log('User has changed.');
//     console.log(user);
// })
// user.on('save', () => {
//     console.log('User has been saved.');
//     console.log(user);
// })
// user.on('error', () => {
//     console.log('Ups! Something went wrong...');
// })

// Test framework API
// user.fetch();
// user.set({ name: "Jeremy Stones", age: 34 });
// user.save();

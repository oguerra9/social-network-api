const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsers, getRandomUsers, getRandomUsername, getRandomThoughts, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing thoughts
    await Thought.deleteMany({});
    
    // Drop existing users
    await User.deleteMany({});

    const thoughts = [...getRandomThoughts(20)];
    console.log(thoughts);

    await Thought.collection.insertMany(thoughts);
    console.log(thoughts);

    const users = [];
    const usernames = getUsers();

    console.log(thoughts[0]);

    for (let i = 0; i < 10; i++) {
        console.log('loop #' + i);
        const friends = getRandomUsers(3);
        const username = usernames[i];
        const email = `${username}@email.com`;
        const userThoughts = [thoughts[i*2]._id, thoughts[i*2+1]._id];

        users.push({
            username: username, 
            email: email, 
            thoughts: userThoughts, 
            friends: friends,
        });

    }

    await User.collection.insertMany(users);
    // await Thought.collection.insertMany(thoughts);

    // loop through the saved thoughts, for each thought, generate a reaction and insert the reactions
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);
})
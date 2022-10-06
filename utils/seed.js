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

    const users = [];
    const thoughts = getRandomThoughts(10);
    const usernames = getUsers();

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThoughts(5);
        const friends = getRandomUsers(10);
        const username = usernames[i];
        const email = `${username}@email.com`;

        users.push({
            username, 
            email, 
            thoughts, 
            friends,
        });
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    // loop through the saved thoughts, for each thought, generate a reaction and insert the reactions
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);
})
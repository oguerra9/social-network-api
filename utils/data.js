const usernames = [
  'user1',
  'user2',
  'user3',
  'user4',
  'user5',
  'user6',
  'user7',
  'user8',
  'user9',
  'user10',
  'user11',
  'user12',
  'user13',
  'user14',
  'user15',
  'user16',
  'user17',
  'user18',
  'user19',
  'user20',
];


const thoughtTexts = [
  'i am thinking 1...',
  'i am thinking 2...',
  'i am thinking 3...',
  'i am thinking 4...',
  'i am thinking 5...',
  'i am thinking 6...',
  'i am thinking 7...',
  'i am thinking 8...',
  'i am thinking 9...',
  'i am thinking 10...',
  'i am thinking 11...',
  'i am thinking 12...',
  'i am thinking 13...',
  'i am thinking 14...',
  'i am thinking 15...',
];

const possibleReactions = [
  'like',
  'love',
  'lol',
  'cry',
  'sad',
  'dislike'
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random videos that we can add to the database. Includes video responses.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtTexts),
      reactions: [...getReactions(3)],
    });
  }
  return results;
};

// Create the responses that will be added to each video
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomThoughts, getRandomThoughts };

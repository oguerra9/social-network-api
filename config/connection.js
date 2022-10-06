const { connect, connection } = require('mongoose');

connect('mongodb://localhost:3001/socialMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

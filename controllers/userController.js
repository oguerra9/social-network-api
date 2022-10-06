const { User, Thought } = require('../models');

/*
**`/api/users`**

* `GET` all users
        -- getUsers

* `GET` a single user by its `_id` and populated thought and friend data
        -- getSingleUser (userId)

* `POST` a new user:
        -- createUser
*/

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that id' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // create a new user
      createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user)) //************************************************************************ */
          .catch((err) => res.status(500).json(err));
      },
    };
    
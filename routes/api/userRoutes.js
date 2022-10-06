const userRouter = require('express').Router();

/*
**`/api/users`**

* `GET` all users
        -- getUsers

* `GET` a single user by its `_id` and populated thought and friend data
        -- getSingleUser (userId)

* `POST` a new user:
        -- createUser
*/

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
userRouter.route('/').get(getUsers).post(createUser);

// /api/users/:userId
//userRouter.route('/:userId').get(getSingleUser);
userRouter
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);



module.exports = userRouter;
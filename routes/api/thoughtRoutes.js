const thoughtRouter = require('express').Router();

/*
**`/api/thoughts`**

* `GET` to get all thoughts 
    -- getThoughts

* `GET` to get a single thought by its `_id` 
    -- getSingleThought (:thoughtId)

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    -- createThought

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`
    -- updateThought

* `DELETE` to remove a thought by its `_id`
    -- deleteThought
*/

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
thoughtRouter.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
thoughtRouter
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


/*
**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field
    -- addReaction

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    -- removeReaction
*/

// /api/thoughts/:thoughtId/reactions
thoughtRouter.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
thoughtRouter.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = thoughtRouter;
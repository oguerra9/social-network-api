const { Thought, User } = require('../models');

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

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field
    -- addReaction

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    -- removeReaction
*/

module.exports = {
    // GET /api/thoughts
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET /api/thoughts/:thoughtId
    // get a single thought with thoughtId
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST /api/thoughts
    // create a thought
    createThought(req,res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but no user found with that ID',
                    })
                    : res.json('Thought posted')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // PUT /api/thoughts/:thoughtId
    // update a thought
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE /api/thoughts/:thoughtId
    // delete a thought
    deleteThought(req,res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ 
                        message: 'Thought deleted but no user by this id', 
                    })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // POST /api/thoughts/:thoughtId/reactions
    // add a reaction to thought with thoughtID
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // DELETE /api/:thoughts/reactions/:reactionId
    // remove a reaction with reactionID from a thought with thoughtID
    removeReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought    
                    ? res.status(404).json({ message: 'No thought with this id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
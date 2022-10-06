const { Schema, model } = require('mongoose');
//const Thought = require('./Thought');

/*
* `username`
  * String
  * 
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)
  * 
*/

// Schema to create a new User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // MONGOOSE MATCHING VALIDATION   
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        // friends: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: this,
        //     }
        // ]
        //thoughts: [Thought],
        friends: [this],
        // friends: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: this,
        //     },
        // ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



/*
**Schema Settings**:

Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
*/

userSchema  
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    })
    

// initialize user model
const User = model('user', userSchema);

module.exports = User;
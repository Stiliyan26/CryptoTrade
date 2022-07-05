const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO change user model according to exam description
//TODO add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const NAME_PATTERN = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [5, 'The username should be at least five characters long'] },
    email: { type: String, required: true, minlength: [10, 'The email should be at least ten character long'] },
    hashedPassword: { type: String, required: true },
});

//TODO change index parameter to email if it is written on the exam description
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;
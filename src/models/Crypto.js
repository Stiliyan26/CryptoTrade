const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const cryptoSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'The Name should be at least two characters'] },
    image: { type: String, required: true, validate: {
        validator(value){
            return URL_PATTERN.test(value);
        },
        message: 'The Crypto Image should start with http:// or https://.'
    } },
    price: { type: Number, required: true, min: [0, 'The Price should be a positive number'] },
    description: { type: String, required: true, minlength: [10, 'The Description should be a minimum of 10 characters long.'] },
    paymentType: { type: String, required: true, enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'] },
    cryptoUsers: {type: [ObjectId], ref: 'User', default: []},
    owner: {type: ObjectId, ref: 'User' }
})

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;
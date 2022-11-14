const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        password: { type: String, required: true}
    },
    { collection: 'fahad' }
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;
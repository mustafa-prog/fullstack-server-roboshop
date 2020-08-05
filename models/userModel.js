const { Schema, model } = require('mongoose');
const { encrypt, compare } = require('../lib/encryption');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  creditCard: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  console.log(this.password);
  this.password = await encrypt(this.password);
  console.log(this.password);
  next();
});

UserSchema.method('authenticate', async function (givenPassword) {
  return await compare(givenPassword, this.password);
});

module.exports = model('User', UserSchema);

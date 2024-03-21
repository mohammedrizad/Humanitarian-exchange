const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ngoName: String,
  firstName: String,
  city: String,
  state: String,
  experience: String,
  address: String,
  postalCode: String,
  phoneNumber: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  documents: {
    data: Buffer, // Store binary data
    contentType: String, // Store content type (e.g., application/pdf)
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

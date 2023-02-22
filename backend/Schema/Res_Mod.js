const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    phone_no:{
        type: String,
        required: true,
        unique: true,
        min: 10
    },
    password:{
        type: String,
        required: true,
        min:8
    },

  });

  const User = mongoose.model('User_Res',UserSchema);
  module.exports = User
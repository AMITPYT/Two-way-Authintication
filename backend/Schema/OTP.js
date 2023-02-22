const mongoose = require('mongoose');
const { Schema } = mongoose;

const OtpSchema = new Schema({
    PhoneNo: String,
    code: String,
    expire: Number,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"userId"
}
},{
    timestamps: true
})

const otp = new mongoose.model('otp', OtpSchema, 'otp' );
module.exports = otp;
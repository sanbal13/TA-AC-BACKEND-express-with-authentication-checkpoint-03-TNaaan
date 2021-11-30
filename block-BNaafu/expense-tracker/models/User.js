const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  age: { type: Number },
  phone: { type: Number },
  country: { type: String },
}, { timestamps: true });

// Pre save hook
userSchema.pre('save', function (next) {
  if (this.password && this.isModified(password)) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    return next();
  }
});

// Verify Password
userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => cb(err, result));
};

module.exports = mongoose.model('User', userSchema);

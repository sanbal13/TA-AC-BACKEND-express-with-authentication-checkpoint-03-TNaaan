const mongoose = require('mongoose');

const { Schema } = mongoose;

const incomeSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.Model('Income', incomeSchema);

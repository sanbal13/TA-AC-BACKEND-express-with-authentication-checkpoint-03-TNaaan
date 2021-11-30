const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.Model('Expense', expenseSchema);

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    senderAccount: {
      type: String,
      required: true,
    },
    receiverAccount: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['transfer', 'airtime', 'data'],
      required: true,
    },
    transactionAmount: {
      type: Number,
    },
    transactionDetails: {
      type: String,
    },
    transactionStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;

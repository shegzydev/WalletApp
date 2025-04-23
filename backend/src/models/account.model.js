import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    accountType: {
      type: String,
      enum: ['current', 'savings'],
      required: true,
      default: 'savings',
    },
    KYCLevel: {
      type: String,
      enum: ['0', '1', '2', '3'],
      required: true,
      default: '0',
    },
    beneficiaries: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', accountSchema);
export default Account;

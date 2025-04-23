import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);
export default Beneficiary;

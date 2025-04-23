import Account from '../models/account.model.js';
import Transaction from '../models/transaction.model.js';
import { ObjectId } from 'mongodb';
import { io, getReceiverSocketId } from '../lib/socket.js';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { senderAccount: req.account.accountNumber },
        { receiverAccount: req.account.accountNumber },
      ],
    });

    if (!transactions) {
      return res.status(404).json({ message: 'No transactions available' });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);

    const objId = new ObjectId(`${id}`);
    const transaction = await Transaction.findById(objId);

    if (!transaction) {
      return res.status(404).json({ message: 'transaction not found' });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const doTransfer = async (req, res) => {
  const { receiverAccountNumber, amount, details, save } = req.body;

  if (isNaN(receiverAccountNumber) || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const senderAccount = req.account;

  try {
    if (Number(senderAccount.balance) < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    let receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    });
    if (!receiverAccount) {
      return res.status(404).json({ message: 'Receiver account not found' });
    }

    const updatedAccount = await Account.findOneAndUpdate(
      { userId: senderAccount.userId },
      {
        $inc: { balance: -amount },
        $addToSet: {
          beneficiaries: save
            ? {
                accountNumber: receiverAccountNumber,
                accountName: receiverAccount.accountName,
              }
            : undefined,
        },
      },
      { new: true }
    );
    req.account = updatedAccount;

    const updatedReceiverAcct = await Account.findOneAndUpdate(
      { userId: receiverAccount.userId },
      { $inc: { balance: +amount } },
      { new: true }
    );
    receiverAccount = updatedReceiverAcct;

    const newTransaction = new Transaction({
      senderAccount: senderAccount.accountNumber,
      receiverAccount: receiverAccount.accountNumber,
      transactionType: 'transfer',
      transactionAmount: amount,
      transactionDetails: details,
      transactionStatus: 'success',
    });
    if (newTransaction) {
      await newTransaction.save();
    }

    const receiverSocketId = getReceiverSocketId(receiverAccount.userId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveTransfer', {
        transaction: newTransaction,
        accountBal: updatedReceiverAcct.balance,
      });
      console.log('transferred to ', receiverSocketId);
    }

    res.status(200).json({
      message: 'Transfer Successful',
      transaction: newTransaction,
      account: req.account,
    });
  } catch (error) {
    console.error('error while transferring: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

import Account from '../models/account.model.js';

export const getAccount = async (req, res) => {
  const userId = req.user._id;
  const accountNumber = req.query.accountNumber;

  try {
    const account = await Account.findOne({ userId, accountNumber });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({
      account,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRecepient = async (req, res) => {
  const accountNumber = req.query.accountNumber;
  try {
    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({
      name: account.accountName,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createAccount = async (req, res) => {
  const userId = req.user._id;
  const accountNumber = req.body.accountNumber;

  try {
    if (isNaN(accountNumber)) {
      return res.status(400).json({ message: 'Invalid account number' });
    }

    const existingAccount = await Account.findOne({ userId, accountNumber });
    if (existingAccount) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    const newAccount = new Account({
      userId,
      accountNumber,
      accountName: req.user.name,
      balance: 10000,
    });

    if (newAccount) {
      await newAccount.save();
      res
        .status(201)
        .json({ message: 'Account created successfully', newAccount });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

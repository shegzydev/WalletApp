import Account from '../models/account.model.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ message: 'Unauthorized: no token' });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded)
      return res.status(401).json({ message: 'Unauthorized: invalid token' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const account = await Account.findOne({
      userId: decoded.id,
      accountNumber: user.accountNumber[0],
    });
    if (!account) return res.status(404).json({ message: 'Account not found' });

    req.user = user;
    req.account = account;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

import cloudinary from '../lib/cloudinary.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../models/account.model.js';

function createToken(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: '7d',
  });
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
  return token;
}

function getPublicUserData(user) {
  return {
    id: user._id,
    name: user.name,
    phone: user.phone,
    accountNumber: user.accountNumber,
    profilePic: user.profilePic,
  };
}

function getPublicAccountData(account) {
  return {
    accountType: account.accountType,
    accountNumber: account.accountNumber,
    balance: account.balance,
    KYCLevel: account.KYCLevel,
  };
}

export const register = async (req, res) => {
  const { firstname, lastname, phone, password } = req.body;
  try {
    if (!firstname || !lastname || !phone || !password) {
      return res.status(400).json({ message: 'please fill in all fields' });
    }

    if (isNaN(phone)) {
      return res.status(400).json({ message: 'phone number must be a number' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: `${firstname} ${lastname}`,
      phone,
      accountNumber: [phone],
      password: hashedPassword,
    });
    if (newUser) {
      const token = createToken(res, newUser._id);
      await newUser.save();

      const newAccount = new Account({
        userId: newUser._id,
        accountNumber: phone,
        accountName: newUser.name,
        balance: 10000,
      });

      if (newAccount) {
        await newAccount.save();

        res.status(201).json({
          message: 'User created successfully',
          user: getPublicUserData(newUser),
          account: getPublicAccountData(newAccount),
          token,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error while registering' });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (isNaN(phone)) {
      return res.status(400).json({ message: 'phone number must be a number' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(res, user._id);
    res.status(200).json({
      message: 'Logged in successfully',
      user: getPublicUserData(user),
      token,
    });
  } catch (error) {
    console.error('error during login:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error while logging in' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Successful logout' });
  } catch (error) {
    console.log('Error during logout', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      user: getPublicUserData(req.user),
    });
  } catch (error) {
    console.error(error);
  }
};

export const profile = async (req, res) => {
  res.status(200).json({ profile: getPublicUserData(req.user) });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

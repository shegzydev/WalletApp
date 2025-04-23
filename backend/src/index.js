import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import cors from 'cors';

import path from 'path';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import transactionRoutes from './routes/transaction.route.js';
import accountRoutes from './routes/account.route.js';
import mongoose from 'mongoose';
import { app, server } from './lib/socket.js';

dotenv.config();

const __dirname = path.resolve();

//Enable json parsing from request
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: 'http://192.168.0.146:5173',
    credentials: true,
  })
);

//APIs
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/account', accountRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  console.log(__dirname);
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
  connectDB();
});

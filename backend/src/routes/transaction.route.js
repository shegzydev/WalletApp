import express from 'express';
import {
  doTransfer,
  getTransaction,
  getTransactions,
} from '../controllers/transaction.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/transfer', protectRoute, doTransfer);
router.get('/getall', protectRoute, getTransactions);
//router.get('/get', protectRoute, getTransaction);

export default router;

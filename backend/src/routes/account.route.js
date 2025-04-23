import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  createAccount,
  getAccount,
  getRecepient,
} from '../controllers/account.controller.js';

const router = express.Router();

router.get('/getrecepient', protectRoute, getRecepient);
router.get('/getacct', protectRoute, getAccount);
router.post('/create', protectRoute, createAccount);

export default router;

import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAccount, getRecepient } from '../controllers/account.controller.js';

const router = express.Router();

router.get('/getrecepient', getRecepient);
router.get('/getacct', protectRoute, getAccount);
router.post('/create', protectRoute);

export default router;

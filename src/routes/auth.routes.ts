import { Router } from 'express';
import { createAccount } from '../controllers/user.controller';

const router = Router();

router.post('/auth/register', createAccount);

export default router;

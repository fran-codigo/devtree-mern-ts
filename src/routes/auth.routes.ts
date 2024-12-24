import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAccount,
  getUser,
  login,
  updateProfile,
} from '../controllers/user.controller';
import { handleUnputErrors } from '../middleware/validation';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
  body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
  body('email').isEmail().withMessage('Email no válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña es muy corta, minimo 8 caracteres'),
  handleUnputErrors,
  createAccount
);

router.post(
  '/auth/login',
  body('email').isEmail().withMessage('Email no válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatorio'),
  handleUnputErrors,
  login
);

router.get('/user', authenticate, getUser);
router.patch(
  '/user',
  body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
  handleUnputErrors,
  authenticate,
  updateProfile
);

export default router;

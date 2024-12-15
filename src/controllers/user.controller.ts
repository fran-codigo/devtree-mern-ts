import type { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error('El usuario ya existe');
    res.status(409).json({
      error: error.message,
    });
    return;
  }

  // * Forma 2
  const user = new User(req.body);
  user.password = await hashPassword(password.toString());

  await user.save();

  // * Forma 1
  // await User.create(req.body);

  res.json({ msg: 'Registro Creado correctamnete' });
};

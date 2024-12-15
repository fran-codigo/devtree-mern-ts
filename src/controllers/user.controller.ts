import type { Request, Response } from 'express';
import slug from 'slug';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error('Un usuario con ese correo ya existe');
    res.status(409).json({
      error: error.message,
    });
    return;
  }

  const handle = slug(req.body.handle, '');
  const handleExists = await User.findOne({ handle });

  if (handleExists) {
    const error = new Error('Nombre de usuario no disponible');
    res.status(409).json({
      error: error.message,
    });
    return;
  }

  // * Forma 2
  const user = new User(req.body);
  user.password = await hashPassword(password.toString());
  user.handle = handle;

  await user.save();

  // * Forma 1
  // await User.create(req.body);

  res.json({ msg: 'Registro Creado correctamnete' });
};

import type { Request, Response } from 'express';
import slug from 'slug';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { checkPassword, hashPassword } from '../utils/auth';
import { generatJWT } from '../utils/jwt';

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
  user.password = await hashPassword(password);
  user.handle = handle;

  await user.save();

  // * Forma 1
  // await User.create(req.body);

  res.json({ msg: 'Registro Creado correctamnete' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Revisar si el usuario existe
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error('El usuario no existe');
    res.status(404).json({
      error: error.message,
    });
    return;
  }

  // Comprobar contraseña
  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error('La contraseña es incorrecta');
    res.status(401).json({
      error: error.message,
    });
    return;
  }

  const token = generatJWT({ id: user._id });

  res.send(token);
};

export const getUser = async (req: Request, res: Response) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error('No autorizado');
    res.status(401).json({
      error: error.message,
    });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    const error = new Error('No autorizado');
    res.status(401).json({
      error: error.message,
    });
    return;
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof result === 'object' && result.id) {
      const user = await User.findById(result.id).select('-password');

      if (!user) {
        res.status(404).json({ error: 'El usuario no existe' });
        return;
      }

      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Token no válido' });
  }
};

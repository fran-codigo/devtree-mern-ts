import User from '../models/User';

export const createAccount = async (req, res) => {
  // * Forma 2
  const user = new User(req.body);

  await user.save();

  // * Forma 1
  // await User.create(req.body);

  res.json({ msg: 'Registro Creado correctamnete' });
};

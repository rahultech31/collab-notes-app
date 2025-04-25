import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, email, password, role = 'user', secretKey } = req.body;
  console.log('process.env.ADMIN_SECRET: ', process.env.ADMIN_SECRET);

  if (role !== 'user') {
    if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid admin secret key' });
    }
    if (role === 'viewer' && secretKey !== process.env.VIEWER_SECRET) {
      return res.status(403).json({ message: 'Invalid viewer secret key' });
    }
  }

  try {
    // const userExists = await User.findOne({ email });
    // if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,  
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

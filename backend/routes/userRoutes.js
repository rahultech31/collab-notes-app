import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Only admin can access this.');
});

router.get('/viewer', protect, authorizeRoles('viewer', 'admin' ), (req, res) => {
  res.send('Viewers and Admins can access this.');
});

router.get('/user', protect, authorizeRoles('user', 'admin' ,"viewer"), (req, res) => {
  res.send('Users and Admins can access this.');
});

export default router;

import express from 'express';
import { registerUser, getLocationByPhoneNumber } from '../controllers/userController.js'; // Ensure both methods are imported

const router = express.Router();

// Route for registering a user
router.post('/register', registerUser);

// Route for fetching user location by phone number
router.get('/location/:phoneNumber', getLocationByPhoneNumber); // Ensure correct endpoint

export default router;

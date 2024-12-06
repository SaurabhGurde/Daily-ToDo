import express from 'express';
import { loginUser, signupUser } from '../controllers/users.js';
const router = express.Router();

router.post("/createuser", signupUser)
router.post("/loginuser", loginUser)

export default router
import { Router } from 'express';
import { loginUser, myProfile, registerUSer, verifyUser } from "../controller/userController.js";
import { isAuth } from '../middleware/isAuth.js';

const router = Router();

// Paths are now simpler: /api/register, /api/login, etc.
router.post('/register', registerUSer);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);

export default router;
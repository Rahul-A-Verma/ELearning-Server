import { Router } from 'express'
import {loginUser, myProfile, registerUSer, verifyUser} from "../controller/userController.js"
import { isAuth } from '../middleware/isAuth.js';
const router = Router()

router.post('/user/register',registerUSer)
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
export default router
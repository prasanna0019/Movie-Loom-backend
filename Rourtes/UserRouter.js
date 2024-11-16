import { Router } from "express";
const router = Router();
import { Login, LogOut, Register } from '../Controllers/UserController.js'

router.post("/register", Register)
router.post("/login", Login)
router.get('/logout', LogOut)


export default router;
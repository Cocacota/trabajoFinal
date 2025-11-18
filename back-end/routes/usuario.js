// routes/users.js
import { Router } from "express";
import { getUsers, registerUser, loginUser, getProfile } from "../controladores/controlUsuario.js";
import { verifyToken } from "../midleware/auth.js";
const router = Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/perfil",verifyToken ,getProfile)

export default router;

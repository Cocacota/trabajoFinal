// routes/users.js
import { Router } from "express";
import { getListaProducto, cargarProducto,getProducto  } from "../controladores/controlProducto.js";
import { verifyToken } from "../midleware/auth.js";
const router = Router();

router.get("/", getListaProducto);
router.post("/cargar", cargarProducto,verifyToken);
router.post("/producto", getProducto);

export default router;
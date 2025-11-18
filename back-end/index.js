// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/usuario.js";
import productoRoutes from "./routes/producto.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // para leer JSON en peticiones

app.use("/api/usuario", userRoutes); // prefijo para las rutas de usuario
app.use("/api/producto",productoRoutes);

app.get("/", (req, res) => res.send("✅ Servidor funcionando"));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

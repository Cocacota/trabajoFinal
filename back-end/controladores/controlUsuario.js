// controllers/userController.js
import { db } from "../configuracion/bd.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};



export const registerUser = async (req, res) => {
  console.log("📩 Datos recibidos:", req.body);
  const {
    nombre,
    apellido,
    email,
    password,
    telefono,
    direccion,
    tipo_usuario,
    id_suscripcion,
    foto_perfil,
    bio
  } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Verificar si el email ya existe
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await db.query(
      `INSERT INTO users 
       (nombre, apellido, email, password, telefono, direccion, tipo_usuario, foto_perfil,id_suscripcion,bio)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?,? ,?)`,
       
      [
        nombre,
        apellido,
        email,
        hashedPassword,
        telefono || null,
        direccion || null,
        tipo_usuario || "normal",
        foto_perfil || null,
        id_suscripcion || 1,
        bio || null
      ]
    );

    res.json({ message: "✅ Usuario registrado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
console.log("📩 Datos recibidos:", req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    // Buscar usuario por email
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }else{ console.log("contraseña correcta")}

    // Actualizar fecha de última conexión
    await db.query("UPDATE users SET ultima_conexion = NOW() WHERE id = ?", [user.id]);

    // Respuesta exitosa (sin enviar la contraseña)
     const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({
      message: "✅",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        foto_perfil: user.foto_perfil,
      },
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query("SELECT id, nombre, apellido, email, tipo_usuario, foto_perfil FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};
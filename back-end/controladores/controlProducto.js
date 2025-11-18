import { db } from "../configuracion/bd.js";

export const getListaProducto = async (req, res) => {
   try {
    const [rows] = await db.query(`
      SELECT 
        p.*, 
        u.nombre AS usuario_nombre, 
        u.foto_perfil AS usuario_foto
      FROM products p
      JOIN users u ON p.id_usuario = u.id
      ORDER BY p.fecha_publicacion DESC
    `);

    const products = rows.map((row) => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: row.precio,
      ubicacion: row.ubicacion,
      disponible: row.disponible,
      imagen: row.imagen_principal || null,
      usuario: {
        nombre: row.usuario_nombre,
        foto: row.usuario_foto,
      },
    }));

    res.json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
export const getProducto = async (req, res) => {
    const {id}=req.body;
  try {
    const [rows] = await db.query("SELECT * FROM tools WHERE id=?",[id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los producto" });
  }
};
export const cargarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio_dia, foto_url } = req.body;
    const user_id = req.user.id; // viene del token

    if (!nombre || !precio_dia) {
      return res.status(400).json({ message: "Nombre y precio son obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio_dia, foto_url, user_id) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, precio_dia, foto_url, user_id]
    );

    res.status(201).json({
      message: "✅ Producto creado correctamente",
      productoId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};
// conexion_db.js
import mysql from "mysql2";

// Crea la conexión directamente
const conexion = await mysql.createConnection({
  host: "localhost",       // Dirección del servidor MySQL
  user: "root",            // Usuario de MySQL
  password: "admin", // Cambia esto por tu contraseña real
  database: "genshin_db", // Nombre de tu base de datos
  port: 3306               // Puerto por defecto de MySQL
});

// Conectarse y verificar
conexion.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
  } else {
    console.log("✅ Conexión a MySQL establecida correctamente");
  }
});

// Exporta la conexión para usarla en otros archivos
export default conexion;

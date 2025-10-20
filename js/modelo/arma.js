// models/arma.js
import conexion from "../conexion_db.js";

class Arma {
  constructor(id_armaBase, id_usuario, nivel, refinamiento, ataque_creado, bono_secundario_valor) {
    this.id_armaBase = id_armaBase;
    this.id_usuario = id_usuario;
    this.nivel = nivel;
    this.refinamiento = refinamiento;
    this.ataque_creado = ataque_creado;
    this.bono_secundario_valor = bono_secundario_valor;
  }

  // Carga los datos base desde la tabla arma_base
  async cargarDatosBase() {
    return new Promise((resolve, reject) => {
      const consulta = "SELECT * FROM arma_base WHERE id_arma = ?";
      conexion.query(consulta, [this.id_armaBase], (err, resultado) => {
        if (err) return reject(err);
        if (resultado.length === 0) return reject("No se encontro el arma base");

        const datos = resultado[0];
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.estrellas = datos.estrellas;
        this.tipo = datos.tipo;
        this.bono_secundario = datos.bono_secundario;
        this.archivo_bono = datos.archivo_bono;

        resolve(this);
      });
    });
  }

  // Guarda esta arma en la base de datos
    async guardarEnDB() {
    const consulta = `
      INSERT INTO arma_creada (id_arma_base, id_usuario, nivel, refinamiento, ataque_creado, bono_secundario_valor)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      this.id_armaBase,
      this.id_usuario,
      this.nivel,
      this.refinamiento,
      this.ataque_creado,
      this.bono_secundario_valor
    ];

    conexion.query(consulta, valores, (err, resultado) => {
      if (err) {
        console.error("❌ Error al guardar arma:", err);
      } else {
        console.log("✅ Arma guardada con ID:", resultado.insertId);
      }
    });
  }
}

export default Arma;


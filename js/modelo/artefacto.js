import conexion from "../conexion_db.js";



class Artefacto{
    constructor(id_artefactoBase, id_usuario, nivel, bono_principal, bono_principal_valor, bonos_secundario) {
        this.id_artefactoBase = id_artefactoBase;
        this.id_usuario = id_usuario;
        this.nivel = nivel;
        this.bono_principal = bono_principal;
        this.bono_principal_valor = bono_principal_valor;
        this.bonos_secundario = bonos_secundario;
    }

    async cargarDatosBase() {
    return new Promise((resolve, reject) => {
      const consulta = "SELECT * FROM artefacto_base WHERE id_artefacto = ?";
      conexion.query(consulta, [this.id_artefactoBase], (err, resultado) => {
        if (err) return reject(err);
        if (resultado.length === 0) return reject("No se encontro el artefacto base");

        const datos = resultado[0];
        this.tipo = datos.tipo;
        this.estrellas = datos.estrellas;
        this.nombre_set = datos.nombre_set;
        this.descripcion_set = datos.descripcion_set;
        this.bono_set= datos.bono_set;
        resolve(this);
      });
    });
    }

    async guardarEnDB() {
  // 1️⃣ Guardar el artefacto creado
  const consulta = `
    INSERT INTO artefacto_creado (id_artefacto_base, id_usuario, nivel, bono_principal, bono_principal_valor)
    VALUES (?, ?, ?, ?, ?)
  `;
  const valores = [
    this.id_artefactoBase,
    this.id_usuario,
    this.nivel,
    this.bono_principal,
    this.bono_principal_valor
  ];

  // 2️⃣ Esperar que se complete el primer insert
  const idInsertado = await new Promise((resolve, reject) => {
    conexion.query(consulta, valores, (err, resultado) => {
      if (err) {
        console.error("❌ Error al guardar artefacto:", err);
        return reject(err);
      }
      console.log("✅ ARTEFACTO GUARDADO CON ID:", resultado.insertId);
      resolve(resultado.insertId);
    });
  });

  // 3️⃣ Guardar el ID dentro del objeto
  this.id_artefacto_creado = idInsertado;

  // 4️⃣ Ahora sí puedes insertar los bonos secundarios
  const consulta1 = `
    INSERT INTO bono_artefacto_secundario (id_artefacto_creado, bono, valor)
    VALUES (?, ?, ?)
  `;

  for (const bono of this.bonos_secundario) {
    await new Promise((resolve, reject) => {
      const valores1 = [this.id_artefacto_creado, bono.bono, bono.valor];
      conexion.query(consulta1, valores1, (err, resultado1) => {
        if (err) {
          console.error("❌ Error al guardar bonos secundarios:", err);
          return reject(err);
        } else {
          console.log("✅ Bono guardado con ID:", resultado1.insertId);
          resolve();
        }
      });
    });
  }

  console.log("🎯 ID final del artefacto guardado en objeto:", this.id_artefacto_creado);
}

    




}

export default Artefacto;
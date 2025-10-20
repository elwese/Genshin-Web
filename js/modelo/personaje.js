class Personaje {
  constructor({
    id_personaje_base,
    id_usuario,
    id_arma,
    nivel = 1,
    ataque = 0,
    defensa = 0,
    maestria_elemental = 0,
    prob_critico = 0,
    danio_critico = 100,
    recarga_energia = 0,
    // Bonos elementales
    bono_proteccion_escudo = 0,
    bono_anemo = 0,
    bono_geo = 0,
    bono_electro = 0,
    bono_hydro = 0,
    bono_pyro = 0,
    bono_cryo = 0,
    bono_dendro = 0,
    bono_fisico = 0,
    bono_curacion = 0,
    // Resistencias
    resistencia_anemo = 0,
    resistencia_geo = 0,
    resistencia_electro = 0,
    resistencia_hydro = 0,
    resistencia_pyro = 0,
    resistencia_cryo = 0,
    resistencia_dendro = 0,
    resistencia_fisico = 0,
    // Niveles de habilidades
    nivel_basicos = 1,
    nivel_elemental = 1,
    nivel_ult = 1,
    nivel_constelacion = 0,
    // Artefactos equipados
    artefacto_1 = null,
    artefacto_2 = null,
    artefacto_3 = null,
    artefacto_4 = null,
    artefacto_5 = null
  }) {
    this.id_personaje_base = id_personaje_base;
    this.id_usuario = id_usuario;
    this.id_arma = id_arma;
    this.nivel = nivel;
    this.ataque = ataque;
    this.defensa = defensa;
    this.maestria_elemental = maestria_elemental;
    this.prob_critico = prob_critico;
    this.danio_critico = danio_critico;
    this.recarga_energia = recarga_energia;
    this.bono_proteccion_escudo = bono_proteccion_escudo;
    this.nivel_constelacion = nivel_constelacion;

    // Grupos más limpios
    this.bonos = {
      anemo: bono_anemo || 0,
      geo: bono_geo || 0,
      electro: bono_electro || 0,
      hydro: bono_hydro || 0,
      pyro: bono_pyro || 0,
      cryo: bono_cryo || 0,
      dendro: bono_dendro || 0,
      fisico: bono_fisico || 0,
      curacion: bono_curacion || 0,
    };

    this.resistencias = {
      anemo: resistencia_anemo || 0,
      geo: resistencia_geo || 0,
      electro: resistencia_electro || 0,
      hydro: resistencia_hydro || 0,
      pyro: resistencia_pyro || 0,
      cryo: resistencia_cryo || 0,
      dendro: resistencia_dendro || 0,
      fisico: resistencia_fisico || 0,
    };

    this.niveles_habilidades = {
      basico: nivel_basicos || 1,
      elemental: nivel_elemental || 1,
      ult: nivel_ult || 1,
    };

    this.artefactos = {
        artefacto_1,
        artefacto_2,
        artefacto_3,
        artefacto_4,
        artefacto_5
    }; 
  }
  guardarEnDB() {
    // Lógica para guardar el personaje en la base de datos
    

  }

}

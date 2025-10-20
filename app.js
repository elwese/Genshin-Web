import Arma from "./js/modelo/arma.js";
import Artefacto from "./js/modelo/artefacto.js";

async function app() {
  try {
    const miArma = new Arma(1, 1, 20, 2, 150, 12.5);
    const miArtefacto = new Artefacto(1, 1, 20, "ATQ_P", 150, [{"bono":"VIDA","valor":100},{"bono":"DEF","valor":50}]);
    await miArma.cargarDatosBase();  // Trae info desde arma_base
    await miArtefacto.cargarDatosBase();  // Trae info desde artefacto_base
    console.log("Arma cargada:", miArma);
    console.log("Artefacto cargado:", miArtefacto);

    miArma.guardarEnDB();  // Guarda en arma_creada
    miArtefacto.guardarEnDB();  // Guarda en artefacto_creado
  } catch (err) {
    console.error("Error:", err);
  }
}

app();
class Receta {
  constructor(id, nombre) {
    (this.id = id),
      (this.nombre = nombre),
      (this.ingredientes = []),
      (this.pasos = []);
  }
  addIngrediente(id, producto, cantidad) {
    if (id == 0) {
      const nwIngrediente = new Ingrediente(
        this.ingredientes.length + 1,
        producto,
        cantidad
      );
      this.ingredientes.push(nwIngrediente);
    } else {
      for (let ingrediente of this.ingredientes) {
        if (ingrediente.id >= id) {
          ingrediente.id += 1;
        }
      }
      const nwIngrediente = new Ingrediente(id, producto, cantidad);
      this.ingredientes.push(nwIngrediente);
      this.ingredientes.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  }

  delIngrediente(id) {
    let index = this.ingredientes.findIndex((ingrediente) => {
      return ingrediente.id == id;
    });
    this.ingredientes.splice(index, 1);
    for (let ingrediente of this.ingredientes) {
      if (ingrediente.id >= id) {
        ingrediente.id -= 1;
      }
    }
    this.ingredientes.sort(function (a, b) {
      return a.id - b.id;
    });
  }
  modIngrediente(id, cant) {
    let index = this.ingredientes.findIndex((ingrediente) => {
      return ingrediente.id == id;
    });
    this.ingredientes[index].cantidad = cant;
  }

  addPaso(id, detPaso) {
    if (id == 0) {
      const nwPaso = new Paso(this.pasos.length + 1, detPaso);
      this.pasos.push(nwPaso);
    } else {
      for (let paso of this.pasos) {
        if (paso.id >= id) {
          paso.id += 1;
        }
      }
      const nwPaso = new Paso(id, detPaso);
      this.pasos.push(nwPaso);
      this.pasos.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  }

  delPaso(id) {
    let index = this.pasos.findIndex((paso) => {
      return paso.id == id;
    });
    this.pasos.splice(index, 1);
    for (let paso of this.pasos) {
      if (paso.id >= id) {
        paso.id -= 1;
      }
    }
    this.pasos.sort(function (a, b) {
      return a.id - b.id;
    });
  }
}

class Ingrediente {
  constructor(id, producto, cantidad) {
    (this.id = id), (this.producto = producto), (this.cantidad = cantidad);
  }
}
class Paso {
  constructor(id, detPaso) {
    (this.id = id), (this.detPaso = detPaso);
  }
}
const Recetario = [];

const Recipe1 = new Receta(1, "Berenjenas");
Recipe1.addIngrediente(0, "Berenjenas", "4");
Recipe1.addIngrediente(0, "Agua", "300cc");
Recipe1.addIngrediente(0, "Vinagre", "300cc");
Recipe1.addIngrediente(0, "Dientes de Ajo", "4");
Recipe1.addIngrediente(0, "Pimienta en Grano", "c/n");
Recipe1.addIngrediente(5, "Aji Molido", "c/n");
const Recipe2 = new Receta(2, "Pepinos");
const Recipe3 = new Receta(3, "Pan de Carne");

Recetario.push(Recipe1);
Recetario.push(Recipe2);
Recetario.push(Recipe3);

// Recetario[0].delIngrediente(3);

// verRecetario();
// alert(getIngredientes(0));
// alert(getPasos(0));

function getOpc() {
  let res = parseInt(
    prompt(`Seleccione una Opcion:
    1-Agregar Receta
    2-Modificar Receta
    3-Eliminar Receta
    4-Mostrar Recetario
    5-Ver Receta
    0-Salir`)
  );
  return res;
}
function menu() {
  let res = getOpc();
  if (isNaN(res)) {
    res = 0;
  }
  switch (res) {
    case 1:
      addReceta();
      break;
    case 2:
      modReceta();
      break;
    case 3:
      delReceta();
      break;
    case 4:
      verRecetario();
      break;
    case 5:
      verReceta();
      break;
    case 0:
      alert(`Gracias por su Visita
        Que Tenga un Buen Día`);
      bSalir = true;
      break;
    default:
      alert("Seleccione una opcion Válida");
      break;
  }
}
function addReceta() {
  let nomReceta = prompt("Ingrese Nombre de la Receta");
  let bContinuar = false;
  const nwRecipe = new Receta(Recetario.length + 1, nomReceta);
  while (bContinuar != true) {
    let prod = prompt("Ingrese Ingrediente");
    let cant = prompt("Ingrese Cantidad");
    if (
      (prod != null) &
      (prod.length > 0) &
      ((cant != null) & (cant.length > 0))
    ) {
      nwRecipe.addIngrediente(0, prod, cant);
      let res = prompt("Desea Agregar Otro Ingrediente? S/N");
      if ((res != null) & (res.length == 0)) {
        if (res.toLowerCase() == "n") {
          bContinuar = true;
        }
      } else {
        bContinuar = true;
      }
    } else {
      bContinuar = true;
    }
  }

  bContinuar = false;
  while (bContinuar != true) {
    let step = prompt("Ingrese Detalles Etapa");
    if ((step != null) & (step.length > 0)) {
      nwRecipe.addPaso(0, step);
      let res = prompt("Desea Agregar Otro Paso? S/N");
      if ((res != null) & (res.length == 1)) {
        if (res.toLowerCase() == "n") {
          bContinuar = true;
        }
      } else {
        bContinuar = true;
      }
    } else {
      bC = true;
    }
  }
  Recetario.push(nwRecipe);
  console.log(nwRecipe);
  alert("La Receta fue Agregada del Recetario");
}

function modReceta() {
  let res = parseInt(
    prompt(`Seleccione una Receta a dar de Baja
    ${getRecetario()}`)
  );
  let index = Recetario.findIndex((receta) => {
    return receta.id == res;
  });
  res = parseInt(
    prompt(`Seleccione que desea Modificar:
      1-Nombre de Receta
      2-Insertar un Nuevo Ingrediente
      3-Modificar Cantidad 
      4-Eliminar un Ingrediente
      5-Insertar un Nuevo Paso en la Preparacion
      6-Eliminar un Paso en la Preparacion
      0-Volver al Menu Principal`)
  );
  switch (res) {
    case 1:
      res = prompt("Ingrese Nuevo Nombre");
      Recetario[index].nombre = res;
      alert("Modificacion Realizada");
      break;

    case 2:
      let prod = prompt("Ingrese Ingrediente");
      let cant = prompt("Ingrese Cantidad");
      res = prompt("Desea Agregarlo al Final del Listado? S/N");
      if (res.toLowerCase() == "s") {
        Recetario[index].addIngrediente(0, prod, cant);
      } else if (res.toLowerCase() == "n") {
        res = parseInt(
          prompt(
            `Seleccione donde Insertar el Ingrediente ${getIngredientes(index)}`
          )
        );
        Recetario[index].addIngrediente(res, prod, cant);
      }
      alert("Ingrediente Agregado");
      break;

    case 3:
      res = parseInt(
        prompt(
          `Seleccione el Ingrediente a Modificar ${getIngredientes(index)}`
        )
      );
      let nwCant = prompt("Ingrese Cantidad");
      Recetario[index].modIngrediente(res, nwCant);
      alert("Modificacion Realizada");
      break;

    case 4:
      res = parseInt(
        prompt(`Seleccione el Ingrediente a Eliminar ${getIngredientes(index)}`)
      );
      Recetario[index].delIngrediente(res);
      alert("Ingrediente Eliminado");
      break;

    case 5:
      let detPaso = prompt("Ingrese Informacion del Paso");
      res = prompt("Desea Agregarlo al Final del Listado? S/N");
      if (res.toLowerCase() == "s") {
        Recetario[index].addPaso(0, detPaso);
      } else if (res.toLowerCase() == "n") {
        res = parseInt(
          prompt(`Seleccione donde Insertar el Paso ${getPasos(index)}`)
        );
        Recetario[index].addPaso(res, detPaso);
      }
      alert("Paso Agregado");
      break;

    case 6:
      res = parseInt(
        prompt(`Seleccione la Etapa a Eliminar ${getPasos(index)}`)
      );
      Recetario[index].delPaso(res);
      break;

    case 0:
      break;
    default:
      alert("Seleccione una Opcion Válida");
      break;
  }
}

function delReceta() {
  let res = parseInt(
    prompt(`Seleccione una Receta a dar de Baja
${getRecetario()}`)
  );
  let index = Recetario.findIndex((receta) => {
    return receta.id == res;
  });
  Recetario.splice(index, 1);
  for (let receta of Recetario) {
    if (receta.id >= res) {
      receta.id -= 1;
    }
  }
  Recetario.sort(function (a, b) {
    return a.id - b.id;
  });
  alert("La Receta Fue Eliminada del Recetario");
}

function verRecetario() {
  alert(`Nuestro Recetario Ofrece:\n ${getRecetario()}`);
}

function verReceta() {
  let res = parseInt(
    prompt(`Seleccione una Receta a der de Baja
    ${getRecetario()}`)
  );
  let index = Recetario.findIndex((receta) => {
    return receta.id == res;
  });
  let sRes = `${Recetario[index].nombre}\n \n Ingredientes: ${getIngredientes(
    index
  )}\n Preparacion:\n${getPasos(index)}`;
  alert(sRes);
}

function getRecetario() {
  let sRes = `\n`;
  for (let recetas of Recetario) {
    sRes += `${recetas.id} - ${recetas.nombre} \n`;
  }
  return sRes;
}

function getIngredientes(id) {
  let sRes = `\n`;
  for (let ingrediente of Recetario[id].ingredientes) {
    sRes += `${ingrediente.id} - ${ingrediente.producto}  ${ingrediente.cantidad}\n`;
  }
  return sRes;
}

function getPasos(id) {
  let sRes = `\n`;
  for (let paso of Recetario[id].pasos) {
    sRes += `${paso.id}° Paso\n - ${paso.detPaso}\n`;
  }
  return sRes;
}

let bSalir;
while (bSalir != true) {
  menu();
}

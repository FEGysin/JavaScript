let recipeCard = document.getElementById("recipeCard");
let recCardIngredientes = document.getElementById("recCardIngredientes");
let recCardPasos = document.getElementById("recCardPasos");
let recetario = document.getElementById("recetario");
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

nwRecetas();
getRecetario();
getIngredientes(0);
getPasos(0);

function nwRecetas() {
  const Recipe1 = new Receta(1, "Berenjenas");
  Recipe1.addIngrediente(0, "Berenjenas", "4");
  Recipe1.addIngrediente(0, "Agua", "300cc");
  Recipe1.addIngrediente(0, "Vinagre de Vino", "300cc");
  Recipe1.addIngrediente(0, "Vinagre de Alcohol", "300cc");
  Recipe1.addIngrediente(0, "Sal", "c/n");
  Recipe1.addIngrediente(0, "Dientes de Ajo", "4");
  Recipe1.addIngrediente(0, "Pimienta en Grano", "c/n");
  Recipe1.addIngrediente(0, "Ají Molido", "c/n");
  Recipe1.addIngrediente(0, "Aceite de Girasol", "c/n");

  Recipe1.addPaso(
    0,
    "Pelar las Berenjenas y cortarlas en rodajas de 2 cm aproximadamente"
  );
  Recipe1.addPaso(
    0,
    "Colocar las Berenjenas contadas en agua y sal por 30 minutos"
  );
  Recipe1.addPaso(
    0,
    "Colar las Berenjenas y ponerlas a hervir con el Agua y los 2 Vinagres y Sal a Gusto"
  );
  Recipe1.addPaso(0, "Pelar y cortar el ajo");
  Recipe1.addPaso(
    0,
    "Dejar Hervir hasta que las Berenjenas se puedan pinchar fácilmente"
  );
  Recipe1.addPaso(
    0,
    "Colar las Berenjenas reservando parte del Liquido de Cocción"
  );
  Recipe1.addPaso(
    0,
    "En un frasco de Vidrio coloque las Berenjenas hasta hacer un piso"
  );
  Recipe1.addPaso(
    0,
    "Agregue una pizca del Ajo, una Pizca de Ají Molido y unos Granos de Pimienta Negra"
  );
  Recipe1.addPaso(
    0,
    "Repita los últimos 2 pasos hasta llegar casi al borde del frasco"
  );
  Recipe1.addPaso(
    0,
    "Una Vez Terminado agregue liquido de Cocción hasta la mitad y complete con aceite hasta tapar las berenjenas "
  );
  Recipe1.addPaso(
    0,
    "Reservar en Heladera 1 día para que asienten los sabores"
  );
  Recipe1.addPaso(0, "Disfrútelas !!!");

  const Recipe2 = new Receta(2, "Morrones con Ajo");
  Recipe2.addIngrediente(0, "Morrones Rojo", "4");
  Recipe2.addIngrediente(0, "Dientes de Ajo", "4");
  Recipe2.addIngrediente(0, "Sal", "c/n");
  Recipe2.addIngrediente(0, "Aceite de Girasol", "c/n");

  Recipe2.addPaso(
    0,
    "Al seleccionar los morrones fíjese que tengas las caras parejas"
  );
  Recipe2.addPaso(0, "Lave los Morrones y séquelos");
  Recipe2.addPaso(
    0,
    "Acéitese las manos, aceite los morrones y colóquelos en una Bandeja para Horno"
  );
  Recipe2.addPaso(0, "Prenda el Horno y déjelo Calentar");
  Recipe2.addPaso(
    0,
    "Coloque los Morrones en el Horno girándolos cada tanto para que las caras se cocinen parejas"
  );
  Recipe2.addPaso(
    0,
    "Cuando la piel este bien dorada y los morrones ya se perciban cocidos, retírelos del Horno"
  );
  Recipe2.addPaso(
    0,
    "Coloque los Morrones en un recipiente, hágale un corte y envuélvalo con una Bolsa plástica"
  );
  Recipe2.addPaso(0, "Deje Reposar hasta que entibien");
  Recipe2.addPaso(
    0,
    "Saque de a uno los Morrones, retírele la piel el cabo y las semillas dejando solamente la carne del Morrón"
  );
  Recipe2.addPaso(
    0,
    "Corte los Morrones y colóquelos nuevamente en el jugo que quedo en el recipiente"
  );
  Recipe2.addPaso(0, "Agregue el ajo previamente picado y sal a gusto");
  Recipe2.addPaso(0, "En un frasco de Vidrio coloque la Preparación.");
  Recipe2.addPaso(0, "Complete con aceite hasta tapar los Morrones");
  Recipe2.addPaso(
    0,
    "Reservar en Heladera 1 día para que asienten los sabores"
  );
  Recipe2.addPaso(0, "Disfrútelos !!!");

  const Recipe3 = new Receta(3, "Pan de Carne");
  Recipe3.addIngrediente(0, "Carne Picada", "500gr");
  Recipe3.addIngrediente(0, "Fetas de Jamón Cocido", "5");
  Recipe3.addIngrediente(0, "Fetas de Queso de Barra", "5");
  Recipe3.addIngrediente(0, "Huevos", "2");
  Recipe3.addIngrediente(0, "Pan Rallado", "150gr");
  Recipe3.addIngrediente(0, "Dientes de Ajo", "2");
  Recipe3.addIngrediente(0, "Pimienta", "c/n");
  Recipe3.addIngrediente(0, "Aji Molido", "c/n");
  Recipe3.addIngrediente(0, "Sal", "c/n");
  Recipe3.addIngrediente(0, "Moztaza", "c/n");
  Recipe3.addIngrediente(0, "Aceite de Girasol", "c/n");

  Recipe3.addPaso(0, "Pique los dientes de Ajo");
  Recipe3.addPaso(
    0,
    "Bata los Huevos y añada Pimienta, Ají Molido y Sal a Gusto"
  );
  Recipe3.addPaso(
    0,
    "Mezcle la carne picada con los huevos sazonados y el Pan rallado"
  );
  Recipe3.addPaso(
    0,
    "Sobre un Film o un Paño limpio espolvoree un poco de Pan rallado"
  );
  Recipe3.addPaso(
    0,
    "Vierta la Mezcla sobre el paño dándole forma rectangular de aproximadamente 1 cm de alto"
  );
  Recipe3.addPaso(
    0,
    "Pincele con un poco de Mostaza el rectángulo de carne picada"
  );
  Recipe3.addPaso(
    0,
    "Distribuya el jamón cocido y luego el queso sobre la carne picada"
  );
  Recipe3.addPaso(0, "Arrolle la preparación y forma un cilindro");
  Recipe3.addPaso(
    0,
    "Aceite la base de una Bandeja para Horno y coloque el pan de carne"
  );
  Recipe3.addPaso(0, "Pincele nuevamente con mostaza");
  Recipe3.addPaso(
    0,
    "Coloque la bandeja en el Horno y cocine por aproximadamente 45 minutos (puede rotar la preparación para una cocción más pareja)"
  );
  Recipe3.addPaso(0, "Retire del Horno córtelo en rodajas y Disfrute");

  Recetario.push(Recipe1);
  Recetario.push(Recipe2);
  Recetario.push(Recipe3);
}
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
  //let sRes = `\n`;
  if (Recetario.length > 0) {
    for (let recetas of Recetario) {
      //sRes += `${recetas.id} - ${recetas.nombre} \n`;
      let nwRecetaItem = document.createElement("a");
      nwRecetaItem.innerHTML = ` <a id=rec"${recetas.id}"
                class="list-group-item py-3 lh-sm mt-2">
          <div>
            <img src="../recursos/img/comida.jpg" alt="imgComidas" style="width=80%" />
          </div>
          <div
            class="d-flex w-100 align-items-center justify-content-between text-center">
              <strong class="mb-1">${recetas.nombre}</strong>
          </div>
        </a>`;
      nwRecetaItem.addEventListener("click", () => {
        clearCard();
        getIngredientes(recetas.id - 1);
        getPasos(recetas.id - 1);
      });
      recetario.appendChild(nwRecetaItem);
    }
  }
  //return sRes;
}

function clearCard() {
  recCardIngredientes.innerHTML = "";
  recCardPasos.innerHTML = "";
}

function getIngredientes(id) {
  //let sRes = `\n`;
  for (let ingrediente of Recetario[id].ingredientes) {
    //  sRes += `${ingrediente.id} - ${ingrediente.producto}  ${ingrediente.cantidad}\n`;
    //agregar item al recCardIngredientes
    let nwIngredItem = document.createElement("li");
    nwIngredItem.innerHTML = `<li id=ing"${ingrediente.id}" class="list-group-item">${ingrediente.producto} <span>${ingrediente.cantidad}</span></li>`;
    recCardIngredientes.appendChild(nwIngredItem);
  }
  //return sRes;
}

function getPasos(id) {
  //let sRes = `\n`;
  for (let paso of Recetario[id].pasos) {
    //sRes += `${paso.id}° Paso\n - ${paso.detPaso}\n`;
    let nwPasoItem = document.createElement("li");
    nwPasoItem.innerHTML = `<li id=pas"${paso.id}" class="list-group-item"> Paso ${paso.id}: \n ${paso.detPaso}</li>`;
    recCardPasos.appendChild(nwPasoItem);
  }
  //return sRes;
}

//let bSalir;
// while (bSalir != true) {
//   menu();
// }

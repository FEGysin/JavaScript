const RECETARIO = [];
class receta {
  constructor(idReceta, nombre, detalle) {
    this.idReceta = idReceta;
    this.nombre = nombre;
    this.detalle = detalle;
    this.ingredientes = [cantidad, uMedida, ingrediente];
    this.proceso = [pasoNro, descripcion];
  }
  addIngrediente(cantidad, uMedida, ingrediente) {
    this.ingredientes.push(cantidad, uMedida, ingrediente.toLowerCase());
  }
  delIngrediente(ingrediente) {
    let index = this.ingredientes.indexOf(ingrediente.toLowerCase());
    if (index !== -1) {
      this.ingredientes.slice(index, 1);
    }
  }
  modIngrediente(ingrediente, cantidad, uMedida) {
    let index = this.ingredientes.indexOf(ingrediente.toLowerCase);
    if (index !== -1) {
      this.ingredientes[index].cantidad = cantidad;
      this.ingredientes[index].uMedida = uMedida;
    }
  }
  addPaso(descripcion) {
    this.proceso.push(proceso.length + 1, descripcion);
  }
  delPaso(pasoNro) {
    let index = this.proceso.indexOf(pasoNro);
    if (index !== -1) {
      this.proceso.slice(index, 1);
    }
    this.actuNroPaso;
  }
  modPaso(pasoNro, descripcion) {
    let index = this.proceso.indexOf(pasoNro);
    if (index !== -1) {
      this.proceso.slice(index, 1);
    }
  }
  actuNroPaso() {
    for (i = 0; this.proceso.length - 1; i++) {
      this.proceso.pasoNro = i + 1;
    }
  }
  mostrarInfo() {
    return `${this.idReceta} - ${nomReceta} \n ${this.descripcion}\n`;
  }
  mostrarIngredientes() {
    let sRes;
    for (i = 0; this.ingredientes.length - 1; i++) {
      sRes += `${this.ingredientes[i].cantidad} ${this.ingredientes[i].uMedida} de ${this.ingredientes[i].ingrediente}\n`;
    }
    return sRes;
  }
  mostrarProceso() {
    let sRes;
    for (i = 0; this.proceso.length - 1; i++) {
      sRes += `${this.proceso[i].pasoNro}° Paso:\n ${this.proceso[i].descripcion}\n`;
    }
    return sRes;
  }
}
const RECETA = receta();

function selOpcion() {
  let iOpcion = parseInt(
    prompt(`Ingrese el número de la opción que desea realizar:
1 - Para Ver el Recetario:
2 - Para Agregar una Receta:
3 - Para Eliminar una Receta:
4 - Para Mostrar una Receta:
5 - Para Modificar una Receta:
0 - Para salir
`)
  );
  menu(iOpcion);
}
function menu(iOpcion) {
  switch (iOpcion) {
    case 1:
      getRecetas();
      break;

    case 2:
      addReceta();

      break;

    case 3:
      delReceta();
      break;

    case 4:
      getReceta();
      break;

    case 5:
      //modReceta()
      break;

    case 0:
      bSalir = true;
      alert(`Muchas Gracias, que tenga un Buen Día`);
      break;
    default:
      alert("Ingrese una Opcion Válida");
      break;
  }
}
function getRecetas() {
  let sRes = ``;
  RECETARIO.forEach((receta) => (sRes += recipe.mostrarInfo()));
  alert(sRes);
}

function getReceta() {
  let sRes = ``;
  let sRecipe = "Indique Nombre de la receta que desea ver";
  let arrRes = RECETARIO.filter(
    (receta) => receta.nomReceta.toLowerCase() == sRecipe.toLowerCase()
  );
  if (arrRes.length == 0) {
    alert("No se ha encontrado su Búsqueda");
  } else {
    for (let recipeHallada of arrRes) {
      sRes += recipeHallada.mostrarInfo;
      sRes += `Los Ingredientes son:\n`;
      sRes += recipeHallada.mostrarIngredientes;
      sRes += `Procedimiento de Preparacion:\n`;
      sRes += recipeHallada.mostrarProceso;
    }
    alert(sRes);
  }
}

function addReceta() {
  let nomReceta = prompt("Ingrese Nombre de la Receta");
  let detReceta = prompt("Ingrese una Descripcion");
  let bContinuar = false;
  let recipe = new RECETA(RECETARIO.length + 1, nomReceta, detReceta);
  while (bContinuar == false) {
    let ingrediente = prompt("Ingrese el Nombre del Ingrediente");
    let cantidad = parseFloat(prompt("Ingrese la Cantidad a utilizar"));
    let uMedida = prompt(`Ingrese la Medida a usar
grs   - Gramos
cm3   - Centimetros Cúbicos
cda/s - Cucharada/s
a Gto - a Gusto 
`);
    RECETA.addIngrediente(cantidad, uMedida, ingrediente);
    let res = prompt("¿Desea agregar otro Ingrediente? SI/NO");
    if (res.toLowerCase() == "no") {
      bContinuar = true;
    }
    bContinuar = false;
    while (bContinuar == false) {
      let descripcion = prompt(
        `Ingrese Descripcion del ${RECETA.proceso.length + 1}° Paso`
      );

      RECETA.addPaso(descripcion);
      let res = prompt("¿Desea agregar otro Paso? SI/NO");
      if (res.toLowerCase() == "no") {
        bContinuar = true;
      }
      RECETARIO.push(RECETARIO.length + 1, RECETA);
      alert(`Receta ${nomReceta} agregada`);
    }
  }
}

function delReceta() {
  let idReceta = parseInt(prompt("Ingrese Nro de Receta a Eliminar"));
  let index = RECETARIO.indexOf(pasoNro);
  if (index !== -1) {
    this.proceso.slice(index, 1);
  }
  for (i = 0; RECETARIO.length - 1; i++) {
    RECETARIO[i].idReceta = i + 1;
  }
}
function modReceta() {
  let idReceta = parseInt(prompt("Ingrese la Receta a Modificar"));
  let index = RECETARIO.indexOf(idReceta);
  let bContinuar = false;
  let res = prompt(
    "Desea Modificar Ingredientes (I) o Paso de Preparacion (P)?"
  );
  switch (res.toLowerCase()) {
    case "i":
      res = prompt(
        "Desea Modificar (M), Eliminar (E) o Agregar (A) un Ingrediente?"
      );
      switch (res.toLowerCase()) {
        case "a":
          while (bContinuar == false) {
            let ingrediente = prompt("Ingrese el Nombre del Ingrediente");
            let cantidad = parseFloat(prompt("Ingrese la Cantidad a utilizar"));
            let uMedida = prompt(`Ingrese la Medida a usar
            grs   - Gramos
            cm3   - Centimetros Cúbicos
            cda/s - Cucharada/s
            a Gto - a Gusto 
            `);
            RECETA.addIngrediente(cantidad, uMedida, ingrediente);
            let res = prompt("¿Desea agregar otro Ingrediente? SI/NO");
            if (res.toLowerCase() == "no") {
              bContinuar = true;
            }
          }
          break;
        case "m":
          while (bContinuar != true) {
            res = prompt(
              `Seleccione Ingrediente a Modificar: \n ${RECETARIO[index].mostrarIngredientes}`
            );
            let indexIngrediente = RECETARIO[i].ingredientes.indexOf(
              res.toLowerCase()
            );
            if (indexIngrediente != -1) {
              let cantidad = parseFloat(prompt("Ingrese Nueva Cantidad"));
              let uMedida = prompt(`Ingrese Nueva Medida a usar
grs   - Gramos
cm3   - Centimetros Cúbicos
cda/s - Cucharada/s
a Gto - a Gusto 
`);
            } else {
              alert(
                "El Ingrediente ingresado no esta ingresado, Pruebe Nuevamente"
              );
            }
            RECETARIO[i].modIngrediente(res, cantidad, uMedida);
            res = prompt("¿Desea modificar otro Ingrediente? SI/NO");
            if (res.toLowerCase() == "no") {
              bContinuar = true;
            }
          }

          break;
        case "e":
          while (bContinuar) {
            res = prompt(
              `Seleccione Ingrediente a Eliminar: \n${RECETARIO[index].mostrarIngredientes}`
            );
            let indexIngrediente = RECETARIO[i].ingredientes.indexOf(
              res.toLowerCase()
            );
            RECETARIO[i].ingredientes.delIngrediente(res);
            res = prompt("¿Desea eliminar otro Ingrediente? SI/NO");
            if (res.toLowerCase() == "no") {
              bContinuar = true;
            }
          }
        default:
          alert("Seleccione una Opcion Válida");
      }
      break;

    case "p":
      res = prompt("Desea Modificar (M), Eliminar (E) o Agregar (A) un Paso?");

      break;
    default:
      alert("Seleccione una Opcion Válida");
  }
}
let bSalir;
while (bSalir != true) {
  selOpcion;
}

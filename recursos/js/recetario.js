getRecetario();
getIngredientes(0, recCardIngredientes, false);
getPasos(0, recCardPasos, false);

function getRecetario() {
  if (localStorage.getItem(`recetario`)) {
    let recetas = JSON.parse(localStorage.getItem(`recetario`));
    for (const obj of recetas) {
      let nwReceta = new Receta(
        obj.id,
        obj.nombre,
        obj.ingredientes,
        obj.pasos
      );
      Recetario.push(nwReceta);
    }
  } else {
    fetch("./recursos/misRecetas.json")
      .then((res) => {
        return res.json();
      })
      .then((recetas) => {
        for (const obj of recetas) {
          let nwReceta = new Receta(
            obj.id,
            obj.nombre,
            obj.ingredientes,
            obj.pasos
          );
          Recetario.push(nwReceta);
        }
        console.log(Recetario);
        saveRecetario();
      });
  }

  if (Recetario.length > 0) {
    recetario.innerHTML = "";
    for (let recetas of Recetario) {
      domReceta(recetas);
    }
  }
}
function saveRecetario() {
  const data = JSON.stringify(Recetario);
  localStorage.setItem(`recetario`, data);
}

function getIngredientes(id, objDestino, bModDel) {
  recCardIngredientes.innerHTML = "";
  if (Recetario[id].ingredientes.length == 0) {
  } else {
    for (let ingrediente of Recetario[id].ingredientes) {
      domAddIng(id, objDestino, ingrediente, bModDel);
    }
  }
}

function resABMRecipe(sTip, bAceptar) {
  let sMsg = "";
  switch (sTip.toLowerCase()) {
    case "a":
      sMsg = `Insercion  ${bAceptar ? "Realizada" : "Rechazada"}`;

      break;
    case "b":
      sMsg = `Eliminacion ${bAceptar ? "Realizada" : "Rechazada"}`;
      break;
    case "m":
      sMsg = `Modificacion ${bAceptar ? "Realizada" : "Rechazada"}`;
      break;
  }

  swal.fire({
    text: sMsg,
    icon: bAceptar ? "success" : "info",
    timer: 1500,
  });
}

function getPasos(id, objDestino, bModDel) {
  recCardPasos.innerHTML = "";
  for (let paso of Recetario[id].pasos) {
    domAddPaso(id, objDestino, paso, bModDel);
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
}

function delReceta(index) {
  Recetario.splice(index, 1);
  for (let receta of Recetario) {
    receta.id >= res && receta.id--;
  }
  Recetario.sort(function (a, b) {
    return a.id - b.id;
  });
}

function clearCard() {
  recCardIngredientes.innerHTML = "";
  recCardPasos.innerHTML = "";
}

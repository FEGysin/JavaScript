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
    actuListRecetario();
  }
}

function actuListRecetario() {
  recetario.innerHTML = "";
  for (let recetas of Recetario) {
    domReceta(recetas);
  }
}

function saveRecetario() {
  const data = JSON.stringify(Recetario);
  localStorage.setItem(`recetario`, data);
}

function getIngredientes(id, objDestino, bModDel) {
  recCardIngredientes.innerHTML = "";
  if (Recetario[id].ingredientes.length == 0 && !bModDel) {
    domAddBtnNwIng(id);
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
  if (Recetario[id].pasos.length == 0 && !bModDel) {
    domAddBtnNwPaso(id);
  } else {
    for (let paso of Recetario[id].pasos) {
      domAddPaso(id, objDestino, paso, bModDel);
    }
  }
}

function addReceta() {
  Swal.fire({
    input: "text",
    inputLabel: `Agregar Nueva Receta`,
    inputPlaceholder: "Introduzca Nombre de Receta...",
    //position: "",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      id = Recetario.length;
      let nwReceta = new Receta(id + 1, result.value, [], []);
      Recetario.push(nwReceta);
      saveRecetario();
      domReceta(nwReceta);
      getIngredientes(id, recCardIngredientes, true);
      getPasos(id, recCardPasos, true);
    } else {
      resABMRecipe("A", false);
    }
  });

  //   let bSalir = false;
  //   // while (!bSalir) {

  //     console.log(nwReceta);

  // //Agregar Nuevo Ingrediente

  // //agregar Nuevo Paso
  // bSalir = false;
  // while (!bSalir) {

  // }
}

function addNwIng(id) {
  Swal.fire({
    title: "Agregar Ingrediente",
    html: `<input type="text" id="txtIngrediente" class="swal2-input" placeholder="Ingrese Ingrediente">
    <input type="text" id="txtIngCant" class="swal2-input" placeholder="Ingrese Cantidad">`,
    confirmButtonText: "Agregar",
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const nwProd = Swal.getPopup().querySelector("#txtIngrediente").value;
      const nwProdCant = Swal.getPopup().querySelector("#txtIngCant").value;
      if (!nwProd || !nwProdCant) {
        Swal.showValidationMessage(`No se Ingresaron Datos`);
      }
      return { Producto: nwProd, Cant: nwProdCant };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      tConfirm
        .fire({
          icon: "question",
          title: `Confirme Nuevo Ingrediente`,
          text: `¿Desea Insertar el Ingrediente ${result.value.Producto} por ${result.value.Cant} ?`,
        })
        .then((res) => {
          if (res.isConfirmed) {
            tReconf
              .fire({
                icon: "warning",
                text: "¿Realmente desea Insertar?",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  console.log(id);
                  console.log(result.value.Producto);
                  console.log(result.value.Cant);
                  Recetario[id].addIngrediente(
                    0,
                    result.value.Producto,
                    result.value.Cant
                  );
                  saveRecetario();
                  getIngredientes(id, recCardIngredientes, true);
                  resABMRecipe("A", true);
                } else {
                  resABMRecipe("A", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("A", false);
          }
        });
    }
    //  } else {
    //    if (recCardIngredientes.length = 0) {
    //               tReconf
    //        .fire({
    //          icon: "warning",
    //          text: `Al menos debe ingresar un ingrediente
    //      ¿Desea Anular Ingreso?`,
    //        })
    //        .then((res) => {
    //          if (res.isconfirmed) {
    //            delReceta(id);
    //            saveRecetario();
    //            actuListRecetario();
    //            resABMRecipe("B", true);
    //            return;
    //          }
    //        });
    //    }
    //  }
  });
}

function addNwPaso(id) {
  Swal.fire({
    input: "textarea",
    inputLabel: "Insertar un Paso",
    inputPlaceholder: "Agregue el detalle aqui...",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
    cancelButtonText: "Cancelar Ingreso",
  }).then((result) => {
    if (result.isConfirmed) {
      tConfirm
        .fire({
          icon: "question",
          title: `Confirme Nuevo Paso`,
          text: `¿Desea Agregar un Nuevo Paso?`,
        })
        .then((res) => {
          if (res.isConfirmed) {
            tReconf
              .fire({
                icon: "question",
                text: "¿Realmente desea Agregarlo?",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  Recetario[id].addPaso(paso.id, result.value);
                  saveRecetario();
                  getPasos(id, recCardPasos, true);
                  resABMRecipe("A", true);
                } else {
                  resABMRecipe("A", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("A", false);
          }
        });
    }
    //     } else {
    //       if (recCardPasos.length > 0) {
    //         bSalir = true;
    //       } else {
    //         tReconf
    //           .fire({
    //             icon: "warning",
    //             text: `Al menos debe ingresar un Paso
    //      ¿Desea Anular Ingreso?`,
    //           })
    //           .then((res) => {
    //             if (res.isconfirmed) {
    //               delReceta(id);
    //               saveRecetario();
    //               actuListRecetario();
    //               resABMRecipe("B", true);
    //               return;
    //             }
    //           });
    //       }
    //     }
  });
}

function delReceta(index) {
  Recetario.splice(index, 1);
  for (let receta of Recetario) {
    receta.id > index && receta.id--;
  }
  Recetario.sort(function (a, b) {
    return a.id - b.id;
  });
  actuListRecetario();
}

function clearCard() {
  recCardIngredientes.innerHTML = "";
  recCardPasos.innerHTML = "";
}

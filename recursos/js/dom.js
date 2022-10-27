let recipeCard = document.getElementById("recipeCard");
let recCardIngredientes = document.getElementById("recCardIngredientes");
let recCardPasos = document.getElementById("recCardPasos");
let recetario = document.getElementById("recetario");
let lblModalAdd = document.getElementById("modalRecipeLabel");
let modalAdd = document.getElementById("modalBody");
let btnRecetaAdd = document.getElementById("addReceta");
let btnSave = document.getElementById("btnSave");

function domReceta(recetas) {
  let nwRecetaItem = document.createElement("a");
  nwRecetaItem.innerHTML = `
        <a id=rec"${recetas.id}"
          class="list-group-item col-11  py-1 lh-sm mt-2 p-0">
          <div class="m-1 row d-flex justify-content-center">
            <img class="m-2" src="../recursos/img/comida.jpg" alt="imgComidas"/>
          </div>
          <div
            class="m-1 w-80 text-center">
              <strong class="mb-1">${recetas.nombre}</strong>
          </div>
        </a>`;
  nwRecetaItem.addEventListener("click", () => {
    clearCard();
    getIngredientes(recetas.id - 1, recCardIngredientes, false);
    getPasos(recetas.id - 1, recCardPasos, false);
  });
  recetario.appendChild(nwRecetaItem);
  domRecBtn(recetas);
}
function domRecBtn(recetas) {
  nwRecetaItem = document.createElement("div");
  nwRecetaItem.innerHTML = `<div class="col-10">
      <div class="row justify-content-end">
        <button id="btnModRec${recetas.id}" class="btnMod btn btn-success" title="Habilita Modificar la Receta">
          <i class="bi bi-pen-fill"></i>
        </button>
        <button id="btnDelRec${recetas.id}" class="btnDel btn btn-danger" title="Elimina Receta del Recetario">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>`;
  recetario.appendChild(nwRecetaItem);

  let btnMod = document.getElementById(`btnModRec${recetas.id}`);
  btnMod.addEventListener("click", () => {
    clearCard();
    getIngredientes(recetas.id - 1, recCardIngredientes, true);
    getPasos(recetas.id - 1, recCardPasos, true);
  });

  let btnDel = document.getElementById(`btnDelRec${recetas.id}`);
  btnDel.addEventListener("click", () => {
    swConf
      .fire({
        icon: "question",
        title: `Confirme Eliminacion`,
        text: `¿Desea Eliminar la Receta ${recetas.nombre} ?`,
      })
      .then((res) => {
        if (res.isConfirmed) {
          tReconf
            .fire({
              icon: "alert",
              text: "¿Realmente desea Eliminar?",
            })
            .then((res) => {
              if (res.isConfirmed) {
                delReceta(recetas.id - 1);
                saveRecetario();
                getRecetario();
                resABMRecipe("B", true);
              } else {
                resABMRecipe("B", false);
              }
            });
        } else if (res.isDenied) {
          resABMRecipe("B", false);
        }
      });
  });
  recetario.appendChild(nwRecetaItem);
}
function domAddIng(id, objDestino, ingrediente, bModDel) {
  let nwIngredItem = document.createElement("a");
  if (bModDel == false) {
    nwIngredItem.innerHTML = `
    <a id=addModIng"${ingrediente.id}" class="recIngrediente list-group-item d-flex row">
      <div class="d-flex row w-100 justify-content-between text-center">
        <div class="col-4">${ingrediente.producto}</div>
        <div class="col-2">${ingrediente.cantidad}</div>
      </div>
    </a>`;
    objDestino.appendChild(nwIngredItem);
  } else {
    nwIngredItem.innerHTML = `
    <a id=addModIng"${ingrediente.id}" class="recIngrediente list-group-item d-flex row">
      <div class="row justify-content-between text-center">
        <div class="col-5">${ingrediente.producto}</div>
        <div class="col-3">${ingrediente.cantidad}</div>
      </div>  
        <div class="row justify-content-end">
          <button id="btnAddIng${ingrediente.id}" title="Inserta un Ingrediente previo al Actual" class="btnMod btn btn-success">
            <i class="bi bi-plus-circle"></i>
          </button>
          <button id="btnModIng${ingrediente.id}" title="Modifica Cantidad de este Ingrediente" class="btnMod btn btn-secondary" >
            <i class="bi bi-pen-fill"></i>
          </button>
          <button id="btnDelIng${ingrediente.id}" title="Elimina el Ingrediente de la Lista" class="btnDel btn btn-danger">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
    </a>`;
    //data-bs-toggle="modal" data-bs-target="#modalRecipe"
    nwIngredItem.addEventListener("click", () => {
      curIngrediente = ingrediente.id - 1;
    });
    objDestino.appendChild(nwIngredItem);
    domIngAddBtn(id, objDestino, nwIngredItem, ingrediente, bModDel);
  }
}
function domIngAddBtn(id, objDestino, nwIngredItem, ingrediente, bModDel) {
  let btnAdd = document.getElementById(`btnAddIng${ingrediente.id}`);
  let btnMod = document.getElementById(`btnModIng${ingrediente.id}`);
  let btnDel = document.getElementById(`btnDelIng${ingrediente.id}`);

  btnAdd.addEventListener("click", () => {
    //     modalAdd.innerHTML = "";
    //     lblModalAdd.innerText = "Modificacion Ingrediente";

    //     let ingModal = document.createElement(`div`);
    //     ingModal.innerHTML = `
    //       <div class="d-flex row justify-content-around">
    //         <input class="col-5" type="text" name="" id="txtIngrediente" value="">
    //         <input class="col-3" type="text" name="" id="txtIngCant" value="">
    //       </div>`;
    //     modalAdd.appendChild(ingModal);

    //     btnSave.addEventListener("click", () => {
    //       let nwIngrediente = document.getElementById("txtIngrediente");
    //       let nwCant = document.getElementById("txtIngCant");
    Swal.fire({
      title: "Agregar Ingrediente",
      html: `<input type="text" id="txtIngrediente" class="swal2-input" placeholder="Nombre">
        <input type="text" id="txtIngCant" class="swal2-input" placeholder="Cantidad">`,
      confirmButtonText: "Agregar",
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
                  Recetario[id].addIngrediente(
                    ingrediente.id,
                    result.value.Producto,
                    result.value.Cant
                    // nwIngrediente.value,
                    // nwCant.value
                  );
                  saveRecetario();
                  getIngredientes(id, objDestino, bModDel);
                  resABMRecipe("A", true);
                } else {
                  resABMRecipe("A", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("A", false);
          }
        });
    });
  });
  btnMod.addEventListener("click", () => {
    Swal.fire({
      input: "text",
      inputLabel: `Modificar Cantidad de ${ingrediente.producto}`,
      inputValue: ingrediente.cantidad,
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      //showCancelButton: false,
    }).then((result) => {
      tConfirm
        .fire({
          icon: "question",
          title: `Confirme Modificacion`,
          text: `¿Desea Modificar la Cantidad de ${ingrediente.producto} ?`,
        })

        .then((res) => {
          if (res.isConfirmed) {
            tReconf
              .fire({
                icon: "question",
                text: "¿Realmente desea Modificar?",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  Recetario[id].modIngrediente(
                    ingrediente.id,
                    result.value
                    //document.getElementById("txtIngCant").value
                  );
                  saveRecetario();
                  getIngredientes(id, objDestino, bModDel);
                  swal.fire("Modificacion Realizada", "", "success");
                } else {
                  resABMRecipe("M", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("M", false);
          }
        });
    });
  });
  btnDel.addEventListener("click", () => {
    tConfirm
      .fire({
        icon: "question",
        title: `Confirme Eliminacion`,
        text: `¿Desea Eliminar el Ingrediente ${ingrediente.producto} ?`,
      })
      .then((res) => {
        if (res.isConfirmed) {
          tReconf
            .fire({
              icon: "warning",
              iconColor: "#ff0000",
              text: "¿Realmente desea Eliminarlo?",
            })
            .then((res) => {
              if (res.isConfirmed) {
                Recetario[id].delIngrediente(ingrediente.id);
                objDestino.innerHTML = "";
                saveRecetario();
                getIngredientes(id, objDestino, bModDel);
                resABMRecipe("B", true);
              } else {
                resABMRecipe("B", false);
              }
            });
        } else if (res.isDenied) {
          resABMRecipe("B", false);
        }
      });
  });
  objDestino.appendChild(nwIngredItem);
}
function domAddPaso(id, objDestino, paso, bModDel) {
  let nwPasoItem = document.createElement("a");
  if (bModDel == false) {
    nwPasoItem.innerHTML = `<a id=pas"${paso.id}"class="recPaso d-flex m-2 row list-group-item"> Paso ${paso.id}: \n ${paso.detPaso}</a>`;
    objDestino.appendChild(nwPasoItem);
  } else {
    nwPasoItem.innerHTML = `
      <a id=pas"${paso.id}" class="recPaso d-flex row list-group-item"> <div class="Row"> <p>Paso ${paso.id}: \n ${paso.detPaso}</p></div>
        <div class="row justify-content-end">
          <button id="btnAddPas${paso.id}" class="btnMod btn btn-success" title="Inserta un Paso Previo al Actual">
            <i class="bi bi-plus-circle"></i>
          </button>   
          <button id="btnModPas${paso.id}" class="btnMod btn btn-secondary" title="Modifica el Detalle Actual">
            <i class="bi bi-pen-fill"></i>
          </button>
          <button id="btnDelPas${paso.id}" class="btnDel btn btn-danger" title="Elimina el Paso del Proceso">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      </a>`;
    // data-bs-toggle="modal" data-bs-target="#modalRecipe"
    objDestino.appendChild(nwPasoItem);
    domAddPasoBtn(id, objDestino, nwPasoItem, paso, bModDel);
  }
}
function domAddPasoBtn(id, objDestino, nwPasoItem, paso, bModDel) {
  let btnAdd = document.getElementById(`btnAddPas${paso.id}`);
  let btnMod = document.getElementById(`btnModPas${paso.id}`);
  let btnDel = document.getElementById(`btnDelPas${paso.id}`);
  btnAdd.addEventListener("click", () => {
    Swal.fire({
      input: "textarea",
      inputLabel: "Insertar un Paso",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    }).then((result) => {
      tConfirm
        .fire({
          icon: "question",
          title: `Confirme Nuevo Paso`,
          text: `¿Desea Insertar un Paso Previo al Nro ${paso.id} ?`,
        })
        .then((res) => {
          if (res.isConfirmed) {
            tReconf
              .fire({
                icon: "question",
                text: "¿Realmente desea insertar el Paso?",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  Recetario[id].addPaso(paso.id, result.value);
                  saveRecetario();
                  getPasos(id, objDestino, bModDel);

                  resABMRecipe("A", true);
                } else {
                  resABMRecipe("A", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("A", false);
          }
        });
    });
  });
  btnMod.addEventListener("click", () => {
    // lblModalAdd.innerText = "Modificacion de Paso";
    // modalAdd.innerHTML = "";
    // let ingModal = document.createElement(`div`);
    // ingModal.innerHTML = `
    //     <div class="d-flex row justify-content-around">
    //       <input class="col-10" type="text" name="" id="txtDetPaso" value="${paso.detPaso}">
    //     </div>`;
    // modalAdd.appendChild(ingModal);
    // btnSave.addEventListener("click", () => {
    Swal.fire({
      input: "textarea",
      inputLabel: `Modificar Paso N° ${paso.id}`,
      inputValue: paso.detPaso,
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    }).then((result) => {
      tConfirm
        .fire({
          icon: "question",
          title: `Confirme Modificacion`,
          text: `¿Desea Modificar el Paso Nro ${paso.id} ?`,
        })
        .then((res) => {
          if (res.isConfirmed) {
            tReconf
              .fire({
                icon: "question",
                text: "¿Realmente desea Modificar?",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  Recetario[id].modPaso(
                    paso.id,
                    result.value
                    // document.getElementById("txtDetPaso").value
                  );
                  saveRecetario();
                  getPasos(id, objDestino, bModDel);
                  resABMRecipe("M", true);
                } else {
                  resABMRecipe("M", false);
                }
              });
          } else if (res.isDenied) {
            resABMRecipe("M", false);
          }
        });
    });
  });
  btnDel.addEventListener("click", () => {
    tConfirm
      .fire({
        icon: "question",
        title: `Confirme Eliminacion`,
        text: `¿Desea Eliminar el Paso ${paso.id} ?`,
      })
      .then((res) => {
        if (res.isConfirmed) {
          tReconf
            .fire({
              icon: "warning",
              iconColor: "#ff0000",
              text: "¿Ralmente desea Eliminar?",
            })
            .then((res) => {
              if (res.isConfirmed) {
                Recetario[id].delPaso(paso.id);
                objDestino.innerHTML = "";
                getPasos(id, objDestino, bModDel);
                resABMRecipe("B", true);
              } else {
                resABMRecipe("B", false);
              }
            });
        } else if (res.isDenied) {
          resABMRecipe("B", false);
        }
      });
  });
  objDestino.appendChild(nwPasoItem);
}
btnRecetaAdd.addEventListener("click", () => {
  // modalAdd.innerHTML = "";
  //   modalAdd.appendChild();
  let nwReceta = new Receta(Recetario.length + 1, "", [], []);
  Recetario.push(nwReceta);
  domReceta(nwReceta);
});

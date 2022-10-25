let recipeCard = document.getElementById("recipeCard");
let recCardIngredientes = document.getElementById("recCardIngredientes");
let recCardPasos = document.getElementById("recCardPasos");
let recetario = document.getElementById("recetario");
let curIngrediente = 0;
let curPaso = 0;
let lblModalAdd = document.getElementById("modalRecipeLabel");
let modalAdd = document.getElementById("modalBody");
let btnRecetaAdd = document.getElementById("addReceta");
let btnSave = document.getElementById("btnSave");
let Recetario = [];

//nwRecetas();
getRecetario();
getIngredientes(0, recCardIngredientes, false);
getPasos(0, recCardPasos, false);
// Recetario[0].modIngrediente(0, 0);

function getRecetario() {
  let sRes = `\n`;

  if (localStorage.getItem(`recetario`)) {
    let recetas = JSON.parse(localStorage.getItem(`recetario`));
    for (const obj of recetas) {
      // console.log(obj);
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
          // console.log(obj);
          let nwReceta = new Receta(
            obj.id,
            obj.nombre,
            obj.ingredientes,
            obj.pasos
          );
          Recetario.push(nwReceta);
        }
        console.log(Recetario);
        //nwRecetas();
        saveRecetario();
      });
  }

  // console.log(Recetario);
  if (Recetario.length > 0) {
    recetario.innerHTML = ``;
    for (let recetas of Recetario) {
      //sRes += `${recetas.id} - ${recetas.nombre} \n`;
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
        // console.log("Actu Recipes");
        clearCard();
        getIngredientes(recetas.id - 1, recCardIngredientes, false);
        getPasos(recetas.id - 1, recCardPasos, false);
      });
      recetario.appendChild(nwRecetaItem);

      nwRecetaItem = document.createElement("div");
      nwRecetaItem.innerHTML = `<div class="col-10">
        <div class="row justify-content-end">
          <button id="btnModRec${recetas.id}" class="btnMod btn btn-success">
            <i class="bi bi-pen-fill"></i>
          </button>
          <button id="btnDelRec${recetas.id}" class="btnDel btn btn-danger">
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
        swal
          .fire({
            icon: "question",
            title: `Confirme Eliminacion`,
            text: `¿Desea Eliminar la Receta ${recetas.nombre} ?`,
            showCloseButton: "true",
            showDenyButton: "true",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            confirmButtonAriaLabel: "Thumbs up, Aceptar",
            denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
            denyButtonAriaLabel: "Thumbs down, Rechazar",
          })
          .then((res) => {
            if (res.isConfirmed) {
              swal
                .fire({
                  icon: "",
                  text: "¿Ralmente desea Eliminar?",
                  showDenyButton: "true",
                  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
                  confirmButtonAriaLabel: "Thumbs up, Si",
                  denyButtonText: '<i class="fa fa-thumbs-down"></i> No',
                  denyButtonAriaLabel: "Thumbs down, No",
                })
                .then((res) => {
                  if (res.isConfirmed) {
                    delReceta(recetas.id - 1);
                    saveRecetario();
                    getRecetario();
                    swal.fire("Eliminacion Realizada", "", "success");
                  } else {
                    swal.fire("Eliminacion Rechazada", "", "info");
                  }
                });
            } else if (res.isDenied) {
              swal.fire("Eliminacion Rechazada", "", "info");
            }
          });
      });
      recetario.appendChild(nwRecetaItem);
    }
  }
}

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

function saveRecetario() {
  const data = JSON.stringify(Recetario);
  localStorage.setItem(`recetario`, data);
}

function getIngredientes(id, objDestino, bModDel) {
  recCardIngredientes.innerHTML = "";
  for (let ingrediente of Recetario[id].ingredientes) {
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
          <button id="btnAddIng${ingrediente.id}" class="btnMod btn btn-success" data-bs-toggle="modal" data-bs-target="#modalRecipe">
            <i class="bi bi-plus-circle"></i>
          </button>
          <button id="btnModIng${ingrediente.id}" class="btnMod btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalRecipe">
            <i class="bi bi-pen-fill"></i>
          </button>
          <button id="btnDelIng${ingrediente.id}" class="btnDel btn btn-danger">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
    </a>`;

      nwIngredItem.addEventListener("click", () => {
        curIngrediente = ingrediente.id - 1;
        // console.log(curIngrediente);
      });
      objDestino.appendChild(nwIngredItem);
      let btnAdd = document.getElementById(`btnAddIng${ingrediente.id}`);
      let btnMod = document.getElementById(`btnModIng${ingrediente.id}`);
      let btnDel = document.getElementById(`btnDelIng${ingrediente.id}`);

      btnAdd.addEventListener("click", () => {
        modalAdd.innerHTML = "";
        lblModalAdd.innerText = "Modificacion Ingrediente";
        let ingModal = document.createElement(`div`);
        ingModal.innerHTML = `
        <div class="d-flex row justify-content-around">
          <input class="col-5" type="text" name="" id="txtIngrediente" value="">
          <input class="col-3" type="text" name="" id="txtIngCant" value="">
        </div>`;
        modalAdd.appendChild(ingModal);

        btnSave.addEventListener("click", () => {
          let nwIngrediente = document.getElementById("txtIngrediente");
          let nwCant = document.getElementById("txtIngCant");
          swal
            .fire({
              icon: "question",
              title: `Confirme Nuevo Ingrediente`,
              text: `¿Desea Insertar el Ingrediente ${nwIngrediente.value} por ${nwCant.value} ?`,
              showCloseButton: "true",
              showDenyButton: "true",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
              confirmButtonAriaLabel: "Thumbs up, Aceptar",
              denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
              denyButtonAriaLabel: "Thumbs down, Rechazar",
            })
            .then((res) => {
              if (res.isConfirmed) {
                swal
                  .fire({
                    icon: "",
                    text: "¿Realmente desea Insertar?",
                    showDenyButton: "true",
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
                    confirmButtonAriaLabel: "Thumbs up, Si",
                    denyButtonText: '<i class="fa fa-thumbs-down"></i> No',
                    denyButtonAriaLabel: "thumbs down, No",
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      Recetario[id].addIngrediente(
                        ingrediente.id,
                        nwIngrediente.value,
                        nwCant.value
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
        modalAdd.innerHTML = "";
        lblModalAdd.innerText = "Modificacion Ingrediente";
        let ingModal = document.createElement(`div`);
        ingModal.innerHTML = `
        <div class="d-flex row justify-content-around">
          <input class="col-5" type="text" name="" id="txtIngrediente" value="${ingrediente.producto}" readonly>
          <input class="col-3" type="text" name="" id="txtIngCant" value="${ingrediente.cantidad}">
        </div>`;
        modalAdd.appendChild(ingModal);
        btnSave.addEventListener("click", () => {
          swal
            .fire({
              icon: "question",
              title: `Confirme Modificacion`,
              text: `¿Desea Modificar la Cantidad de ${ingrediente.producto} ?`,
              showCloseButton: "true",
              showDenyButton: "true",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
              confirmButtonAriaLabel: "Thumbs up, Aceptar",
              denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
              denyButtonAriaLabel: "Thumbs down, Rechazar",
            })
            .then((res) => {
              if (res.isConfirmed) {
                swal
                  .fire({
                    icon: "",
                    text: "¿Realmente desea Modificar?",
                    //showCloseButton:"false",
                    showDenyButton: "true",
                    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
                    confirmButtonAriaLabel: "Thumbs up, Si",
                    denyButtonText: '<i class="fa fa-thumbs-down"></i> No',
                    denyButtonAriaLabel: "thumbs down, No",
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      Recetario[id].modIngrediente(
                        ingrediente.id,
                        document.getElementById("txtIngCant").value
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
          // saveRecetario();
          // getIngredientes(id, objDestino, bModDel);
        });
      });
      btnDel.addEventListener("click", () => {
        swal
          .fire({
            icon: "question",
            title: `Confirme Eliminacion`,
            text: `¿Desea Eliminar el Ingrediente ${ingrediente.producto} ?`,
            showCloseButton: "true",
            showDenyButton: "true",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            confirmButtonAriaLabel: "Thumbs up, Aceptar",
            denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
            denyButtonAriaLabel: "Thumbs down, Rechazar",
          })
          .then((res) => {
            if (res.isConfirmed) {
              swal
                .fire({
                  icon: "",
                  text: "¿Realmente desea Eliminarlo?",
                  //showCloseButton:"false",
                  showDenyButton: "true",
                  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
                  confirmButtonAriaLabel: "Thumbs up, Si",
                  denyButtonText: '<i class="fa fa-thumbs-down"></i> No',
                  denyButtonAriaLabel: "Thumbs down, No",
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
  }
}

function resABMRecipe(sTip, bAceptar) {
  let sMsg = "";
  switch (sTip.toLowerCase()) {
    case "a":
      sMsg = "Insercion " && bAceptar ? "Realizada" : "Rechazada";

      break;
    case "b":
      sMsg = "Eliminacion " && bAceptar ? "Realizada" : "Rechazada";
      break;
    case "m":
      sMsg = "Modificacion " && bAceptar ? "Realizada" : "Rechazada";
      break;
  }

  swal.fire({
    text: sMsg,
    icon: bAceptar ? "success" : "info",
    timer: 1000,
  });
}

function getPasos(id, objDestino, bModDel) {
  // console.log(`GetPasos ${bModDel}`);
  recCardPasos.innerHTML = "";
  for (let paso of Recetario[id].pasos) {
    let nwPasoItem = document.createElement("a");
    if (bModDel == false) {
      nwPasoItem.innerHTML = `<a id=pas"${paso.id}"class="recPaso d-flex m-2 row list-group-item"> Paso ${paso.id}: \n ${paso.detPaso}</a>`;
      objDestino.appendChild(nwPasoItem);
    } else {
      nwPasoItem.innerHTML = `
      <a id=pas"${paso.id}" class="recPaso d-flex row list-group-item"> <div class="Row"> <p>Paso ${paso.id}: \n ${paso.detPaso}</p></div>
        <div class="row justify-content-end">
          <button id="btnAddPas${paso.id}" class="btnMod btn btn-success"  data-bs-toggle="modal" data-bs-target="#modalRecipe">
            <i class="bi bi-plus-circle"></i>
          </button>   
          <button id="btnModPas${paso.id}" class="btnMod btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalRecipe">
            <i class="bi bi-pen-fill"></i>
          </button>
          <button id="btnDelPas${paso.id}" class="btnDel btn btn-danger">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      </a>`;

      objDestino.appendChild(nwPasoItem);

      let btnAdd = document.getElementById(`btnAddPas${paso.id}`);
      let btnMod = document.getElementById(`btnModPas${paso.id}`);
      let btnDel = document.getElementById(`btnDelPas${paso.id}`);
      btnAdd.addEventListener("click", () => {
        modalAdd.innerHTML = "";
        lblModalAdd.innerText = "Agregar un Paso Previo";
        let ingModal = document.createElement(`div`);
        ingModal.innerHTML = `
        <div class="d-flex row justify-content-around">
          <input class="col-10" type="text" name="" id="txtDetPaso" value="${paso.detPaso}">
        </div>`;
        modalAdd.appendChild(ingModal);
        btnSave.addEventListener("click", () => {
          swal
            .fire({
              icon: "question",
              title: `Confirme Nuevo Paso`,
              text: `¿Desea Insertar un Paso Previo al Nro ${paso.id} ?`,
              showCloseButton: "true",
              showDenyButton: "true",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
              confirmButtonAriaLabel: "Thumbs up, Aceptar",
              denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
              denyButtonAriaLabel: "Thumbs down, Rechazar",
            })
            .then((res) => {
              if (res.isConfirmed) {
                swal
                  .fire({
                    icon: "",
                    text: "¿Ralmente desea insertar el Paso?",
                    //showCloseButton:"false",
                    showDenyButton: "true",
                    confirmButtonText: "<i class=fa fa-thumbs-up></i> Si",
                    confirmButtonAriaLabel: "thumbs-up, Si",
                    denyButtonText: "<i class=fa fa-thumbs-down></i> No",
                    denyButtonAriaLabel: "thumbs-down, No",
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      Recetario[id].addPaso(
                        paso.id,
                        document.getElementById("txtDetPaso").value
                      );
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
        lblModalAdd.innerText = "Modificacion de Paso";
        modalAdd.innerHTML = "";
        let ingModal = document.createElement(`div`);
        ingModal.innerHTML = `
        <div class="d-flex row justify-content-around">
          <input class="col-10" type="text" name="" id="txtDetPaso" value="${paso.detPaso}">
        </div>`;
        modalAdd.appendChild(ingModal);
        btnSave.addEventListener("click", () => {
          swal
            .fire({
              icon: "question",
              title: `Confirme Modificacion`,
              text: `¿Desea Modificar el Paso Nro ${paso.id} ?`,
              showCloseButton: "true",
              showDenyButton: "true",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
              confirmButtonAriaLabel: "Thumbs up, Aceptar",
              denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
              denyButtonAriaLabel: "Thumbs down, Rechazar",
            })
            .then((res) => {
              if (res.isConfirmed) {
                swal
                  .fire({
                    icon: "",
                    text: "¿Realmente desea Modificar?",
                    //showCloseButton:"false",
                    showDenyButton: "true",
                    confirmButtonText: "<i class=fa fa-thumbs-up></i> Si",
                    confirmButtonAriaLabel: "thumbs-up, Si",
                    denyButtonText: "<i class=fa fa-thumbs-down></i> No",
                    denyButtonAriaLabel: "thumbs-down, No",
                  })
                  .then((res) => {
                    if (res.isConfirmed) {
                      Recetario[id].modPaso(
                        paso.id,
                        document.getElementById("txtDetPaso").value
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
        swal
          .fire({
            icon: "question",
            title: `Confirme Eliminacion`,
            text: `¿Desea Eliminar el Paso ${paso.id} ?`,
            showCloseButton: "true",
            showDenyButton: "true",
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
            confirmButtonAriaLabel: "Thumbs up, Aceptar",
            denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
            denyButtonAriaLabel: "Thumbs down, Rechazar",
          })
          .then((res) => {
            if (res.isConfirmed) {
              swal
                .fire({
                  icon: "",
                  text: "¿Ralmente desea Eliminar?",
                  //showCloseButton:"false",
                  showDenyButton: "true",
                  confirmButtonText: "<i class=fa fa-thumbs-up></i> Si",
                  confirmButtonAriaLabel: "thumbs-up, Si",
                  denyButtonText: "<i class=fa fa-thumbs-down></i> No",
                  denyButtonAriaLabel: "thumbs-down, No",
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
  }
}

btnRecetaAdd.addEventListener("click", () => {
  //modalAdd.appendChild();
});

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

let curIngrediente = 0;
let curPaso = 0;
let Recetario = [];
const tConfirm = Swal.mixin({
  toast: true,
  showCloseButton: "true",
  showDenyButton: "true",
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: "Thumbs up, Aceptar",
  denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
  denyButtonAriaLabel: "Thumbs down, Rechazar",
  timer: 4000,
  timerProgressBar: true,
  didOpen: (tConfirm) => {
    tConfirm.addEventListener("mouseenter", Swal.stopTimer);
    tConfirm.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const tReconf = swal.mixin({
  showDenyButton: "true",
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si',
  confirmButtonAriaLabel: "Thumbs up, Si",
  denyButtonText: '<i class="fa fa-thumbs-down"></i> No',
  denyButtonAriaLabel: "thumbs down, No",
  timer: 4000,
  timerProgressBar: true,
  didOpen: (tReconf) => {
    tReconf.addEventListener("mouseenter", Swal.stopTimer);
    tReconf.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const swConf = swal.mixin({
  showCloseButton: "true",
  showDenyButton: "true",
  confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
  confirmButtonAriaLabel: "Thumbs up, Aceptar",
  denyButtonText: '<i class="fa fa-thumbs-down"></i> Rechaza',
  denyButtonAriaLabel: "Thumbs down, Rechazar",
  timer: 5000,
  timerProgressBar: true,
  timerProgressBar: true,
  didOpen: (swConf) => {
    swConf.addEventListener("mouseenter", Swal.stopTimer);
    swConf.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

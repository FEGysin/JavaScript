//let _n = parseInt(prompt("introduzca Factor de tabla de multiplicar"));
//for (let i = 1; i <= 10; i++) {
//  console.log(i * _n);
//alert(i * _n);
//}
//console.log("While");
//let i = 0;
//puede no ejecutar ningun ciclo
//while (i <= 10) {
//  console.log(i);
//  i++;
//}
//console.log("Do");
//ejecuta al menos 1 iteraccion
//i = 0;
//do {
//  console.log(i);
//  i++;
//} while (i <= 10);

//let color = prompt("Ingrese un Color");
//console.log(color.toLowerCase());
//switch (color) {
//  case "rojo":
//  case "azul":
//  case "amarillo":
//    console.log(`El color ${color} es un color Primario`);
//    break;
//  case "verde":
//  case "naranja":
//  case "violeta":
//    let composicion = "";
//    switch (color.toLowerCase()) {
//      case "verde":
//        composicion = "Amarillo y Azul";
//        break;
//      case "naranja":
//        composicion = "Amarillo y Rojo";
//        break;
//      case "violeta":
//        composicion = "Rojo y Amarillo";
//        break;
//    }
//    console.log(
//      `El color ${color} es un color Secundario compuesto por $//{composicion}`
//    );
//    break;
//  default:
//    console.log("El color es Terciario o no es color");
//    break;
//}
let cantPrimos = parseInt(
  prompt("introduzca Cantidad de Nros Primos a Generar")
);
let nroActu = parseInt(prompt("Iniciar desde el Nro"));
let nroFactor = nroActu;
let noPrimo = false;
console.log(
  `Iniciando Busqueda de ${cantPrimos} Numeros Primos a partir del Nro ${nroActu}`
);
for (let i = 1; i <= cantPrimos; i++) {
  noPrimo = true;

  while (noPrimo) {
    nroFactor = nroActu;
    let nFactores = 0;
    do {
      //console.log(`${nroActu / nroFactor} ${Number.isInteger(nroActu / nroFactor)}`);
      if (Number.isInteger(nroActu / nroFactor)) {
        nFactores++;
      }
      nroFactor--;
    } while (nFactores <= 1 && nroFactor > 1);

    if (nFactores == 1) {
      noPrimo = false;
    } else {
      nroActu++;
    }
  }

  if (noPrimo == false) {
    console.log(`${i}° Valor --> ${nroActu} es un Numero Primo`);
  }
  nroActu++;
}

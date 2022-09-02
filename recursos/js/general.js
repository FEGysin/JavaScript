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
//let cantPrimos = parseInt(
//  prompt("introduzca Cantidad de Nros Primos a Generar")
//);
//let nroActu = parseInt(prompt("Iniciar desde el Nro"));
//let nroFactor = nroActu;
//let noPrimo = false;
//console.log(
//  `Iniciando Busqueda de ${cantPrimos} Numeros Primos a partir del Nro ${nroActu}`
//);
//for (let i = 1; i <= cantPrimos; i++) {
//  noPrimo = true;
//
//  while (noPrimo) {
//    nroFactor = nroActu;
//    let nFactores = 0;
//    do {
//      //console.log(`${nroActu / nroFactor} ${Number.isInteger(nroActu / nroFactor)}`);
//      if (Number.isInteger(nroActu / nroFactor)) {
//        nFactores++;
//      }
//      nroFactor--;
//    } while (nFactores <= 1 && nroFactor > 1);
//
//    if (nFactores == 1) {
//      noPrimo = false;
//    } else {
//      nroActu++;
//    }
//  }
//
//  if (noPrimo == false) {
//    console.log(`${i}° Valor --> ${nroActu} es un Numero Primo`);
//  }
//  nroActu++;
//}
//
//let nota=0
//let acum=0
//let prom=0
//let cantNotas=parseint(prompt("Ingrese cantidad de notas que desea Notas"))
//for (let i=0; i<cantNotas;i++){
//  nota=parseint(prompt(`Ingrese la nota ${i+1}`))
//  acum+=nota
//}
//prom=acum/cantNotas
//console.log("La suma total es "+acum)
//console.log("El promedio es "+prom)

//let gCantNotas = parseInt(prompt("Ingrese cantidad de notas que desea Notas"));
//let gAcum = getNotas(gCantNotas);
//function getNotas(cant) {
//  let acum = 0;
//  for (let i = 0; i < cant; i++) {
//    acum += parseInt(prompt(`Ingrese la nota ${i + 1}`));
//  }
//  return acum;
//}
//
//console.log("La suma total es " + gAcum);
//console.log("El promedio es " + gAcum / gCantNotas);
//
const dIVA = 0.21;
let dMontoBruto = 0;
let iDias = 0;
let iTasa = 0;
let dMontoFuturo = 0;
let dDerechosMercado = 0;
let dArancel = 0;
let dIVADerAra = 0;
let bTry = true;
let sRes = "";
while (bTry == true) {
  dMontoBruto = parseFloat(prompt("Ingrese Monto a Caucionar ($)", 0));
  iDias = parseInt(prompt("Ingrese plazo de Caucion (Dias)"), 0);
  iTasa = parseInt(prompt("Ingrese Tasa (%)", 0));
  if (
    dMontoBruto == 0 ||
    iDias == 0 ||
    iTasa == 0 ||
    isNaN(dMontoBruto) ||
    isNaN(iDias) ||
    isNaN(iTasa)
  ) {
    alert("No se especificaron todos los datospara hacer el  Calculo");
  } else {
    dMontoFuturo =
      dMontoBruto + parseFloat(calculoInteres(dMontoBruto, iTasa, iDias, 365));
    dDerechosMercado = parseFloat(
      calculoArancel(dMontoFuturo, 0.09, 90, iDias)
    );
    dArancel = parseFloat(calculoArancel(dMontoFuturo, 0.4, 30, iDias));
    dIVADerAra = parseFloat(calculoIVA(dArancel + dDerechosMercado, "P"));
    alert(getSAlert());
  }
  sRes = prompt("Desea Realizar un Nuevo Calculo? (SI/NO)");
  if (sRes.toLocaleLowerCase() == "si") {
    bTry = true;
  } else {
    alert("Perfecto, que tenga un buen día");
    bTry = false;
  }
}
function calculoInteres(monto, tasa, dias, uTiempo) {
  return ((monto * tasa * dias) / (100 * uTiempo)).toFixed(2);
}
function calculoArancel(monto, tasa, factor, plazo) {
  return (monto * ((tasa / 100 / factor) * plazo)).toFixed(2);
}
function calculoIVA(monto, tipoValor) {
  if (tipoValor.toLocaleLowerCase() == "p") {
    return parseFloat(0).toFixed(2);
  } else {
    return (monto * dIVA).toFixed(2);
  }
}
function getSAlert() {
  let sAlert = `El Monto a Colocar es ${dMontoBruto.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })}\nEl Monto Futuro es ${dMontoFuturo.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })}\nLos Derechos de Mercado son ${dDerechosMercado.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })} (${parseFloat((0.9 / 90) * iDias).toFixed(
    4
  )}%)\nLos Aranceles son ${dArancel.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })} (${parseFloat((0.4 / 30) * iDias).toFixed(4)}%)\n`;
  if (dIVADerAra > 0) {
    sAlert += `EL IVA es ${dIVADerAra.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    })} (${(dIVA * 100).toFixed(0)}%)\n`;
  }
  sAlert += `El Resultado de la Operacion es ${(
    dMontoFuturo -
    dDerechosMercado -
    dArancel -
    dIVADerAra
  ).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })}`;
  console.log(sAlert);
  return sAlert;
}

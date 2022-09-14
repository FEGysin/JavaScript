class Caucion {
  constructor(fecha, dias, mContado, tasa, cuota) {
    (this.fecha = fecha),
      (this.dias = dias),
      (this.mContado = mContado),
      (this.tasa = tasa),
      (this.interes = 0),
      (this.mFuturo = 0),
      (this.gastos = 0),
      (this.iva = 0),
      (this.cuota = cuota);
  }

  calculoInteres() {
    this.interes = (
      (this.mContado * this.tasa * this.dias) /
      (100 * 360)
    ).toFixed(2);
  }
  calculoArancel(tasa, factor) {
    let calAra = (
      (this.mContado + this.interes) *
      ((tasa / 100 / factor) * this.dias)
    ).toFixed(2);
    this.gastos += calAra;
  }
  calculoIVA() {
    this.iva = this.gastos * 0.21;
  }
  actumFuturo() {
    this.calculoInteres();
    this.calculoArancel(0.9, 90);
    this.calculoInteres(0.4, 30);
    this.mFuturo = this.mContado + this.interes + this.gastos + this.iva;
  }
}
class Cuota {
  constructor(
    fecha,
    cuota,
    sdoCapital,
    cuotaBr,
    amortizacion,
    interes,
    iva,
    cuotaNeta,
    metodo
  ) {
    this.fecha = fecha;
    this.cuota = cuota;
    this.sdoCapital = sdoCapital;
    this.cuotaBr = cuotaBr;
    this.amortizacion = amortizacion;
    this.interes = interes;
    this.iva = iva;
    this.cuotaNeta = cuotaNeta;
    this.metodo = metodo;
  }
}
class Prestamo {
  constructor(capital, cuotas, cuotasAnio, interes, mCuotaCaucion) {
    (this.capital = capital),
      (this.cuotas = cuotas),
      (this.cuotasAnio = cuotasAnio),
      (this.interes = interes),
      (this.mCuotaCaucion = mCuotaCaucion),
      (this.iMeses = 0),
      (this.calculo = []);
  }
  getiMeses() {
    switch (this.cuotasAnio) {
      case 1:
        this.iMeses = 12;
        break;
      case 2:
        this.iMeses = 6;
        break;
      case 4:
        this.iMeses = 3;
        break;
      case 12:
        this.iMeses = 1;
        break;
    }
  }
  metFrances() {
    let capital = this.capital;
    let tasaInt = this.interes / 100 / this.cuotasAnio;
    let interes;
    let fecha = new Date();
    let cFija = this.capital * (tasaInt / ((1 - tasaInt) ^ (this.cuotas * -1)));
    for (i = 0; this.cuotas - 1; i++) {
      interes = capital * tasaInt;
      const cuota = new Cuota(
        fecha,
        i + 1,
        capital,
        cFija,
        cFija - interes,
        interes,
        interes * 0.21,
        cFija + interes * 0.21,
        "FR"
      );
      //fecha=Date.prototype.getFullYear()
      this.calculo.push(cuota);
      capital -= cFija;
      fecha = addMonths(fecha.iMeses);
    }
  }

  metAleman() {
    let capital = this.capital;
    let tasaInt = this.interes / 100 / this.cuotasAnio;
    let interes;
    let fecha = new Date();
    let cFija = capital / this.cuotas;
    for (i = 0; cuotas - 1; i++) {
      interes = capital * tasaInt;
      const cuota = new Cuota(
        fecha,
        i + 1,
        capital,
        cFija,
        cFija,
        interes,
        interes * 0.21,
        cFija + interes * 1.21,
        "DE"
      );
      this.calculo.push(cuota);
      capital -= cFija;
      fecha = addMonths(fecha.iMeses);
    }
  }

  metAmericano() {
    let tasaInt = this.interes / 100 / this.cuotasAnio;
    let interes;
    let fecha = new Date();
    for (i = 0; cuotas - 1; i++) {
      interes = this.capital * tasaInt;
      if (i < coutas - 1) {
        const cuota = new Cuota(
          fecha,
          i + 1,
          this.capital,
          interes,
          0,
          interes,
          interes * 1.21,
          "AM"
        );
      } else {
      }
      const cuota = new Cuota(
        fecha,
        i + 1,
        this.capital,
        interes,
        this.capital,
        interes,
        interes * 0.21,
        this.capital + interes * 1.21,
        "AM"
      );
      this.calculo.push(cuota);
      fecha = addMonths(fecha.iMeses);
    }
  }
  caucion() {
    let montoCaucion = this.capital;
    let fCon = new Date();
    let fLiq = addMonths(fCon, this.iMeses);
    let dias = dateDiff(fCon, fLiq);
    for (i = 0; this.cuotas - 1; i++) {
      const nwCaucion = new Caucion(
        fecha,
        dias,
        montoCaucion,
        this.interes,
        this.mCuotaCaucion
      );
      nwCaucion.calculoInteres(0.4, 30);
      nwCaucion.calculoArancel(0.9, 90);
      nwCaucion.actumFuturo();
      montoCaucion -= this.mCuotaCaucion;
    }
  }
  clearInfo() {
    this.calculo.splice(0, this.calculo.length - 1);
  }
}

const prestamo = new Prestamo(0, 0, 0, 0, 0);

function getOpc() {
  let res = parseInt(
    prompt(`Seleccione una Opcion:
      1-Calcular Nuevo Prestamo
      2-Mostrar con Metodo Frances
      3-Mostrar con Metodo Aleman
      4-Mostrar con Metodo Americano
      5-Mostrar Mediante Caucion 
      6-Mostrar Comparativa
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
      nwPrestamo();
      break;
    case 2:
      verPrestamo("FR");
      break;
    case 3:
      verPrestamo("DE");
      break;
    case 4:
      verPrestamo("AM");
      break;
    case 5:
      verPrestamo("CA");
      break;
    case 6:
      //comparaCred();
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

function nwPrestamo() {
  // (capital, cuotas, cuotasAnio, interes, mCuotaCaucion)
  prestamo.clearInfo();
  let dMonto = parseFloat(prompt("Ingrese Monto del Prestamo ($)", 0));
  let iCoutas = parseInt(prompt("Ingrese Cantidad de Coutas"), 0);
  let iTipCuota = parseInt(
    prompt(`Indique Tipo de Couta
    1-Anual
    2-Semestral
    3-Trimestral
    4-Mensual
    `)
  );
  let iCantCuotas = 0;
  switch (iTipCuota) {
    case 1:
      iCantCuotas = 1;
      break;
    case 2:
      iCantCuotas = 2;
      break;
    case 3:
      iCantCuotas = 4;
      break;
    case 4:
      iCantCuotas = 12;
      break;
  }
  let iTasa = parseInt(prompt("Ingrese Tasa (%)", 0));
  let mCuotaCaucion = parseFloat(prompt("Ingrese Monto del Prestamo ($)", 0));
  prestamo.capital = dMonto;
  prestamo.cuotas = iCoutas;
  prestamo.cuotasAnio = iCantCuotas;
  prestamo.tasa = iTasa;
  prestamo.mCuotaCaucion = mCuotaCaucion;
  prestamo.metFrances();
  prestamo.metAleman();
  prestamo.metAmericano();
  prestamo.caucion();
}
function verPrestamo(sTipo) {
  let arr = [];
  let sRes;
  arr = prestamo.calculo.filter(calculo.metodo == sTipo);
  if (sTipo == "CA") {
    sRes = `Fecha - Dias - Capital Restante - Tasa - Interes - Monto Futuro - Gastos - IVA - Cuota Rescate \n`;
  } else {
    sRes = `Nro - Fecha - Capital Restante - Cuota Bruta - Amortizacion - Interes - IVA - Cuota Neta \n`;
  }
  for (let cuota of arr) {
    if (sTipo == "CA") {
      sRes += `${cuota.fecha} $ ${cuota.dias} $ ${cuota.mContado} ${cuota.tasa} % $ ${cuota.interes} $ ${cuota.mFuturo} $ ${cuota.gastos} $ ${cuota.iva} $ ${cuota.cuota} \n`;
    } else {
      sRes += `${cuota.cuota} - ${cuota.fecha} $ ${cuota.sdocapital}  $ ${cuota.cuotaBr} $ ${cuota.amortizacion} $ ${cuota.interes} $ ${cuota.iva} $ ${cuota.cuotaNeta} \n`;
    }
  }
}
function compPrestamos() {}

function addMonths(date, months) {
  let curDate = new Date();
  curDate = date;
  curDate.setMonth(curDate.getMonth() + months);
  return curDate;
}
function dateDiff(fechaIn, fechaFin) {
  let res = Math.round((fechaIn - fechaFin) / (1000 * 60 * 60 * 24));
  if (res < 0) {
    res = res * -1;
  }
  return res;
}

let bSalir;
while (bsalir != true) {
  menu();
}

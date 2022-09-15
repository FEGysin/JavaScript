class Caucion {
  constructor(fecha, dias, mContado, tasa, cuota) {
    (this.fecha = fecha),
      (this.dias = parseInt(dias)),
      (this.mContado = parseFloat(mContado)),
      (this.tasa = parseFloat(tasa)),
      (this.interes = parseFloat(0)),
      (this.mFuturo = parseFloat(0)),
      (this.gastos = parseFloat(0)),
      (this.iva = parseFloat(0)),
      (this.cuota = parseFloat(cuota)),
      (this.metodo = "CA");
  }

  calculoInteres() {
    let monto = 0,
      tasa = 0,
      dias = 0,
      intCau = 0;
    monto = parseFloat(this.mContado);
    tasa = parseFloat(this.tasa);
    dias = parseFloat(this.dias);
    intCau = ((monto * tasa * dias) / (100 * 360)).toFixed(2);
    this.interes = intCau;
  }
  calculoArancel(tasa, factor) {
    let calAra = 0;
    calAra = (
      (parseFloat(this.mContado) + parseFloat(this.interes)) *
      ((tasa / 100 / factor) * this.dias)
    ).toFixed(2);
    this.gastos += parseFloat(calAra);
  }
  calculoIVA() {
    this.iva = (this.gastos * 0.21).toFixed(2);
  }
  actumFuturo() {
    let mCdo = 0,
      int = 0,
      gtos = 0,
      iva = 0;
    mCdo = this.mContado;
    int = this.interes;
    gtos = this.gastos;
    iva = this.iva;
    this.calculoInteres();
    this.calculoArancel(0.9, 90);
    this.calculoArancel(0.4, 30);
    this.mFuturo =
      parseFloat(mCdo) + parseFloat(int) + parseFloat(gtos) + parseFloat(iva);
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
    let cFija = (
      this.capital *
      (tasaInt / (1 - Math.pow(1 + tasaInt, this.cuotas * -1)))
    ).toFixed(2);
    for (let i = 0; i < this.cuotas; i++) {
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
      this.calculo.push(cuota);
      capital -= cFija - interes;
      fecha = addMonths(fecha, this.iMeses);
    }
  }

  metAleman() {
    let capital = this.capital;
    let tasaInt = this.interes / 100 / this.cuotasAnio;
    let interes;
    let fecha = new Date();
    let cFija = capital / this.cuotas;
    for (let i = 0; i < this.cuotas; i++) {
      interes = capital * tasaInt;

      const cuota = new Cuota(
        fecha,
        i + 1,
        capital.toFixed(2),
        cFija.toFixed(2),
        cFija.toFixed(2),
        interes.toFixed(2),
        (interes * 0.21).toFixed(2),
        (cFija + interes * 1.21).toFixed(2),
        "DE"
      );
      this.calculo.push(cuota);
      capital -= cFija;
      fecha = addMonths(fecha, this.iMeses);
    }
  }

  metAmericano() {
    let tasaInt = this.interes / 100 / this.cuotasAnio;
    let interes;
    let fecha = new Date();
    for (let i = 0; i < this.cuotas; i++) {
      interes = this.capital * tasaInt;
      if (i < this.cuotas - 1) {
        const cuota = new Cuota(
          fecha,
          i + 1,
          this.capital.toFixed(2),
          interes.toFixed(2),
          0,
          interes.toFixed(2),
          (interes * 0.21).toFixed(2),
          (interes * 1.21).toFixed(2),
          "AM"
        );
        this.calculo.push(cuota);
      } else {
        const cuota = new Cuota(
          fecha,
          i + 1,
          this.capital.toFixed(2),
          (interes + this.capital).toFixed(2),
          this.capital.toFixed(2),
          interes.toFixed(2),
          (interes * 0.21).toFixed(2),
          (this.capital + interes * 1.21).toFixed(2),
          "AM"
        );
        this.calculo.push(cuota);
      }
      fecha = addMonths(fecha, this.iMeses);
    }
  }
  caucion() {
    let montoCaucion = this.capital;
    let fCon = new Date();
    let fLiq = new Date();
    fLiq = addMonths(fLiq, this.iMeses);

    let dias = dateDiff(fCon, fLiq);
    while (montoCaucion > 0) {
      const nwCaucion = new Caucion(
        fCon,
        dias,
        montoCaucion.toFixed(2),
        this.interes.toFixed(2),
        this.mCuotaCaucion.toFixed(2)
      );
      nwCaucion.calculoInteres();
      nwCaucion.calculoArancel(0.4, 30);
      nwCaucion.calculoArancel(0.9, 90);
      nwCaucion.actumFuturo();
      if (this.mCuotaCaucion < montoCaucion) {
        montoCaucion =
          parseFloat(nwCaucion.mFuturo) - parseFloat(this.mCuotaCaucion);
      } else {
        montoCaucion = 0;
      }
      this.calculo.push(nwCaucion);
      fCon = fLiq;
      fLiq = addMonths(fCon, this.iMeses);
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
      alert(verPrestamo("FR"));
      break;
    case 3:
      alert(verPrestamo("DE"));
      break;
    case 4:
      alert(verPrestamo("AM"));
      break;
    case 5:
      alert(verPrestamo("CA"));
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
  let mCuotaCaucion = parseFloat(
    prompt("Ingrese Monto de Cancelacion Caucion ($)", 0)
  );
  prestamo.capital = dMonto;
  prestamo.cuotas = iCoutas;
  prestamo.cuotasAnio = iCantCuotas;
  prestamo.interes = iTasa;
  prestamo.mCuotaCaucion = mCuotaCaucion;
  prestamo.getiMeses();
  prestamo.metFrances();
  prestamo.metAleman();
  prestamo.metAmericano();
  prestamo.caucion();
}
function verPrestamo(sTipo) {
  let sRes;
  const arr = prestamo.calculo.filter(function (reg) {
    return reg.metodo == sTipo;
  });
  if (sTipo == "CA") {
    sRes = `Fecha - Dias - Capital Restante - Tasa - Interes - Monto Futuro - Gastos - IVA - Cuota Rescate \n`;
  } else {
    sRes = `Nro - Fecha - Capital Restante - Cuota Bruta - Amortizacion - Interes - IVA - Cuota Neta \n`;
  }
  console.log(arr.length);
  for (let cuota of arr) {
    if (sTipo == "CA") {
      sRes += `${cuota.fecha.toLocaleDateString("es-AR")} ${cuota.dias} $ ${
        cuota.mContado
      } ${cuota.tasa} % $ ${cuota.interes} $ ${cuota.mFuturo} $ ${
        cuota.gastos
      } $ ${cuota.iva} $ ${cuota.cuota} \n`;
    } else {
      sRes += `${cuota.cuota} - ${cuota.fecha.toLocaleDateString("es-AR")} $ ${
        cuota.sdocapital
      }  $ ${cuota.cuotaBr} $ ${cuota.amortizacion} $ ${cuota.interes} $ ${
        cuota.iva
      } $ ${cuota.cuotaNeta} \n`;
    }
  }
  return sRes;
  // console.log(arr);
}
function compPrestamos() {}

function addMonths(date, months) {
  let curDate = new Date();
  curDate = date;
  curDate.setMonth(curDate.getMonth() + months);
  return curDate;
}
function dateDiff(fIn, fFin) {
  let res = Math.round((fIn - fFin) / (1000 * 60 * 60 * 24));
  if (res < 0) {
    res = res * -1;
  }
  return res;
}

let bSalir;
while (bSalir != true) {
  menu();
}

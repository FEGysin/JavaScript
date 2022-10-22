class recetaBusqueda {
  constructor(obj) {
    (this.uri = obj.uri),
      (this.label = obj.label),
      (this.image = obj.image),
      (this.images = obj.images);
  }
}
class Receta {
  constructor(id, nombre, ingredientes = [], pasos = []) {
    (this.id = id),
      (this.nombre = nombre),
      (this.ingredientes = ingredientes),
      (this.pasos = pasos);
  }
  addIngrediente(id, producto, cantidad) {
    if (id == 0) {
      const nwIngrediente = new Ingrediente(
        this.ingredientes.length + 1,
        producto,
        cantidad
      );
      this.ingredientes.push(nwIngrediente);
    } else {
      for (let ingrediente of this.ingredientes) {
        ingrediente.id >= id && ingrediente.id++;
      }
      const nwIngrediente = new Ingrediente(id, producto, cantidad);
      this.ingredientes.push(nwIngrediente);
      this.ingredientes.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  }

  delIngrediente(id) {
    let index = this.ingredientes.findIndex((ingrediente) => {
      return ingrediente.id == id;
    });
    this.ingredientes.splice(index, 1);
    for (let ingrediente of this.ingredientes) {
      ingrediente.id >= id && ingrediente.id--;
    }
    this.ingredientes.sort(function (a, b) {
      return a.id - b.id;
    });
  }
  modIngrediente(id, cant) {
    let index = this.ingredientes.findIndex((ingrediente) => {
      return ingrediente.id == id;
    });
    this.ingredientes[index].cantidad = cant;
  }

  addPaso(id, detPaso) {
    if (id == 0) {
      const nwPaso = new Paso(this.pasos.length + 1, detPaso);
      this.pasos.push(nwPaso);
    } else {
      for (let paso of this.pasos) {
        paso.id >= id && paso.id++;
      }
      const nwPaso = new Paso(id, detPaso);
      this.pasos.push(nwPaso);
      this.pasos.sort(function (a, b) {
        return a.id - b.id;
      });
    }
  }
  modPaso(id, detPaso) {
    let index = this.pasos.findIndex((paso) => {
      return paso.id == id;
    });
    this.pasos[index].detPaso = detPaso;
  }
  delPaso(id) {
    let index = this.pasos.findIndex((paso) => {
      return paso.id == id;
    });
    this.pasos.splice(index, 1);
    for (let paso of this.pasos) {
      paso.id >= id && paso.id--;
    }
    this.pasos.sort(function (a, b) {
      return a.id - b.id;
    });
  }
}
class Ingrediente {
  constructor(id, producto, cantidad) {
    (this.id = id), (this.producto = producto), (this.cantidad = cantidad);
  }
}
class Paso {
  constructor(id, detPaso) {
    (this.id = id), (this.detPaso = detPaso);
  }
}

import { Component, OnInit } from '@angular/core';
import {IFigura} from '../coleccionInterfaces';

@Component({
  selector: 'app-itemfigura',
  templateUrl: './itemfigura.page.html',
  styleUrls: ['./itemfigura.page.scss'],
})
export class ItemfiguraPage implements OnInit {

  figura: IFigura = {
    _id: "",
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de figura
    origen: "",
    tamano: 0,
    material: "",
    empresa: "",
  }

  constructor() { }

  cambiarEstadoEditable(idElemento: string) {
    let elemento = document.getElementById(idElemento);
    if (elemento) { // Solo continua si elemento no es null.
      // si tiene el atributo readonly, lo elimina
      if (elemento.hasAttribute("readonly")) {
        elemento.removeAttribute("readonly");
        elemento.focus();
      }
      // si no lo tiene, se lo pone
      else {
        elemento.setAttribute("readonly", "true");
      }
    }
  }

  actualizarItem(){
    console.log("Actualizar item basado en el _id del item");
  }


  eliminarItem(){
    console.log("Eliminar item basado en el _id del item");
  }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {IArma} from '../coleccionInterfaces';

@Component({
  selector: 'app-itemreplica',
  templateUrl: './itemreplica.page.html',
  styleUrls: ['./itemreplica.page.scss'],
})
export class ItemreplicaPage implements OnInit {

  arma: IArma = {
    // datos comunes
    _id: "", // no mostrar id en la vista, solo usar para eliminar o editar
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de arma
    material: "",
    tamano: 0,
    peso: 0,
    fabricante: "",
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

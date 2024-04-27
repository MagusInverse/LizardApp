import { Component, OnInit } from '@angular/core';
import {IVideojuego} from '../coleccionInterfaces';

@Component({
  selector: 'app-itemjuego',
  templateUrl: './itemjuego.page.html',
  styleUrls: ['./itemjuego.page.scss'],
})
export class ItemjuegoPage implements OnInit {

  videojuego: IVideojuego = {
    _id: "",
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de un videojuego
    plataforma: "",
    genero: "",
    creador: "",
    caracteristicas: "",
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

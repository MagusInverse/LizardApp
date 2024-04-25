import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ILibroCreate} from '../coleccionInterfaces';

@Component({
  selector: 'app-modal-crear-libro',
  templateUrl: './modal-crear-libro.page.html',
  styleUrls: ['./modal-crear-libro.page.scss'],
})
export class ModalCrearLibroPage implements OnInit {

  // objeto que contendrá los datos del nuevo libro a crear
  libro: ILibroCreate = {
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de libro
    autor: "",
    editorial: "",
    genero: "",
    edicion: "",
    isbn: "",
    paginas: 0,
    anio_publicacion: 0,
  }

  constructor(private modalController: ModalController) { }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}

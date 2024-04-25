import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IVideojuegoCreate} from '../coleccionInterfaces';

@Component({
  selector: 'app-modal-crear-videojuego',
  templateUrl: './modal-crear-videojuego.page.html',
  styleUrls: ['./modal-crear-videojuego.page.scss'],
})

export class ModalCrearVideojuegoPage implements OnInit {

  // objeto que contendrá los datos del nuevo videojuego a crear
  videojuego: IVideojuegoCreate = {
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

  constructor(private modalController: ModalController) { }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}

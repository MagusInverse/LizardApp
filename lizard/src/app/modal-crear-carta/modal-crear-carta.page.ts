import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ICartaCreate} from '../coleccionInterfaces';

@Component({
  selector: 'app-modal-crear-carta',
  templateUrl: './modal-crear-carta.page.html',
  styleUrls: ['./modal-crear-carta.page.scss'],
})

export class ModalCrearCartaPage implements OnInit {

  // objeto que contendrá los datos de la nueva carta a crear
  carta: ICartaCreate = {
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de carta
    juego: "",
  }

  constructor(private modalController: ModalController) { }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}

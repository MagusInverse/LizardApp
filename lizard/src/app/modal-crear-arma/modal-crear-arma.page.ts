import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IArmaCreate} from '../coleccionInterfaces';

@Component({
  selector: 'app-modal-crear-arma',
  templateUrl: './modal-crear-arma.page.html',
  styleUrls: ['./modal-crear-arma.page.scss'],
})

export class ModalCrearArmaPage implements OnInit {

  // objeto que contendrá los datos de la nueva arma a crear
  arma: IArmaCreate = {
    // datos comunes
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

  constructor(private modalController: ModalController) { }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }
}


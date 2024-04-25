import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IFiguraCreate} from '../coleccionInterfaces';

@Component({
  selector: 'app-modal-crear-figura',
  templateUrl: './modal-crear-figura.page.html',
  styleUrls: ['./modal-crear-figura.page.scss'],
})
export class ModalCrearFiguraPage implements OnInit {

  // objeto que contendrá los datos de la nueva figura a crear
  figura: IFiguraCreate = {
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

  constructor(private modalController: ModalController) { }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}

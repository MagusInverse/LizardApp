import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IArmaCreate} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

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

accessToken='';
category = '';

constructor(private activedRouter: ActivatedRoute, private router: Router, private modalController: ModalController) {
  this.activedRouter.queryParams.subscribe(param=>{
    if(this.router.getCurrentNavigation()?.extras.state){
      this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      this.category = this.router.getCurrentNavigation()?.extras?.state?.['categoryEnviado'];
    }
  })
 }


  cerrarModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }
}


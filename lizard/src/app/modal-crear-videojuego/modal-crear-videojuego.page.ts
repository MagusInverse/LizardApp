import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IVideojuegoCreate} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

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

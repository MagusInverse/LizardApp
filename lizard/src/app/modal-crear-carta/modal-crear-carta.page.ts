import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ICartaCreate} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';

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

  accessToken='';
  category = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private modalController: ModalController, private servicio: MainServiceService, private alertController: AlertController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
        this.category = this.router.getCurrentNavigation()?.extras?.state?.['categoryEnviado'];
      }
    })
   }

   async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  cerrarModal() {
    this.router.navigate(['./cartas']);
  }

  ngOnInit() {
  }

  agregarItem(){
    this.servicio.insertarItem(this.carta, this.accessToken).subscribe(
      (response) => {
        this.presentAlert('Item actualizado exitosamente.');
        let navigationExtras: NavigationExtras = {
          state: {
            accessTokenEnviado: this.accessToken
          }
        }
        this.router.navigate(['/categorias'], navigationExtras);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

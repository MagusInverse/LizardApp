import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tarjeta',
  templateUrl: './modal-tarjeta.page.html',
  styleUrls: ['./modal-tarjeta.page.scss'],
})
export class ModalTarjetaPage implements OnInit {

  accessToken='';
  colorTarjeta: string = '';
  fuenteTarjeta: string = '';
  usuarioInfo: any;
  username: string = '';
  urlFoto: string = '';
  email: string = '';
  titulos: string[] = [];
  logros: string[] = [];
  coleccion: string[] = [];

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService, private alertController: AlertController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
        this.colorTarjeta = this.router.getCurrentNavigation()?.extras?.state?.['colorTarjetaEnviado'];
        this.fuenteTarjeta = this.router.getCurrentNavigation()?.extras?.state?.['fuenteTarjetaEnviado'];
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

  ngOnInit() {
    this.servicio.informacionUsuario(this.accessToken).subscribe(
      (data: any) => {
        this.username = data.username;
        this.urlFoto = data.url_foto;
        this.email = data.email;
        this.titulos = data.titulos;
        this.logros = data.logros;
        this.coleccion = Object.keys(data.coleccion);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

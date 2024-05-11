import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { MainServiceService } from '../services/main-service.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  accessToken='';
  usuarioInfo: any;
  username: string = '';
  urlFoto: string = '';
  email: string = '';
  titulos: string[] = [];
  logros: string[] = [];
  coleccion: string[] = [];
  tituloActual: string = '';

  constructor(private activedRouter: ActivatedRoute, private alertController: AlertController, private router: Router, private servicio: MainServiceService, private navController: NavController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
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
    this.presentAlert('Bienvenid@');
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

  categoria(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./categorias'], navigationExtras);
  }

  top10(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }

    this.router.navigate(['./top10'], navigationExtras);
  }

  logrosytitulos(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }

    this.router.navigate(['./titulosylogros'], navigationExtras);
  }

  generartarjeta(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }

    this.router.navigate(['./tarjeta'], navigationExtras);
  }

  volverAtras() {
    this.navController.pop();
  }
  

}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MainServiceService } from '../services/main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  clave: string = '';

  constructor(private router: Router, private alertController: AlertController, private servicio: MainServiceService, private navController: NavController) { }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
  }

  logeado() {
    this.servicio.inicioSesion(this.usuario, this.clave).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
        let navigationExtras: NavigationExtras = {
          state: {
            accessTokenEnviado: accessToken
          }
        }

        if (accessToken !== '' ){
          
          this.router.navigate(['./home'], navigationExtras);
        }
        else{
          this.presentAlert('Usuario/Password Incorrecta');
        }
      },
      (error) => {
        this.presentAlert('Usuario/Password Incorrecta');
      }
    );
  }

  volverAtras() {
    this.navController.pop();
  }
}
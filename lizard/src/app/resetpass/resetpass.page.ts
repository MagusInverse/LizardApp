import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalpassPage } from '../modalpass/modalpass.page';
import { MainServiceService } from '../services/main-service.service';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  user: string = '';
  email: string = '';

  constructor(private modalController: ModalController, private servicio: MainServiceService, private alertController: AlertController, private router: Router) { }
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async abrirModal() {
    this.servicio.validateUser(this.user, this.email)
      .subscribe(
        (data: any) => {
          if (data && data.mensaje === 'Usuario valido para recuperar contraseña') {
            const navigationExtras: NavigationExtras = {
              state: {
                userEnviado: this.user,
                emailEnviado: this.email
              }
            };
            this.router.navigate(['./modalpass'], navigationExtras);
          } else {
            this.presentAlert('El usuario no es válido para recuperar la contraseña.');
          }
        },
        (error) => {
          this.presentAlert('Usuario no registrado en Lizard');
        }
      );
  }

  async presentModal(userData: any) {
    const modal = await this.modalController.create({
      component: ModalpassPage,
      componentProps: {
        userData: userData
      }
    });
    return await modal.present();
  }


  ngOnInit() {
  }

}

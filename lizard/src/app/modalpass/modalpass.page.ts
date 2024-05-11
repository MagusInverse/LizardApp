import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MainServiceService } from '../services/main-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modalpass',
  templateUrl: './modalpass.page.html',
  styleUrls: ['./modalpass.page.scss'],
})
export class ModalpassPage implements OnInit {
  clave1: string = "";
  clave2: string = "";

  username: string = "";
  email: string = "";

  constructor(private modalController: ModalController, private servicio: MainServiceService, private alertController: AlertController, private activedRouter: ActivatedRoute, private router: Router) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.username = this.router.getCurrentNavigation()?.extras?.state?.['userEnviado'];
        this.email = this.router.getCurrentNavigation()?.extras?.state?.['emailEnviado'];
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
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.presentAlert(this.username +' '+ this.email);
  }

  resetearPass() {    
    if (this.clave1.length >= 8 && this.clave2.length >= 8) {
      if (this.clave1 === this.clave2) {
        this.servicio.resetearClave(this.username, this.email, this.clave1)
          .subscribe(
            (data) => {
              this.presentAlert('Clave reseteada exitosamente');
              this.cerrarModal(); 
            },
            (error) => {
              //this.presentAlert('Error: ' + JSON.stringify(error));
              this.presentAlert('Error al resetear clave');
            }
          );
      } else {
        this.presentAlert('Las claves no coinciden');
      }
    } else {
      this.presentAlert('El largo de la clave debe ser igual o superior a 8 caracteres');
    }
  }
}

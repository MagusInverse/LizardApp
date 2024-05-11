import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  clave1: string = "";
  clave2: string = "";
  correo: string = "";
  username: string = "";
  url: string = "";

  constructor(private servicio: MainServiceService, private alertController: AlertController) { }

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

  registrarUsuario() {
    if(this.clave1.length >= 8 && this.clave2.length >= 8 ){
      if(this.clave1 === this.clave2){
        this.servicio.registrarUsuario(this.username, this.correo, this.clave1, this.url)
        .subscribe(
          (data) => {
            this.presentAlert('Usuario registrado exitosamente');         
          },
          (error) => {
            this.presentAlert('Error al registrar usuario');
          }
        );
      }
      else{
        this.presentAlert('Claves no coinciden');
      }
    }
    else{
      this.presentAlert('El largo de la clave debe ser igual o superior a 8 caracteres');
    }    
  }
}

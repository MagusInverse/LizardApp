import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Variables desde la vista
  usuario: string = "";
  clave: string = "";

  //Usuario
  usuarioArr: any = [
    {
      email:'',
      fecha_registro: '',
      url_foto: '',
      username:''
    }
  ]

  constructor(private router: Router, private alertController: AlertController, public  httpClient : HttpClient) { }

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

  logeado(){
    const url = 'http://localhost:8000/api/autenticacion/token';
    const body = new FormData();
    body.append('username', this.usuario);
    body.append('password', this.clave);

    this.httpClient.post(url, body).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
        let navigationExtras: NavigationExtras = {
          state: {
            accessTokenEnviado: accessToken
          }
        }

        if (accessToken !== '' ){
          this.presentAlert('Bienvenid@');
          this.router.navigate(['./home'], navigationExtras);
        }
        else{
          this.presentAlert('Usuario/Password Incorrecta');
        }
      },
      (error) => {
        this.presentAlert('Usuario/Password Incorrecta');
      }
    )
  }
}

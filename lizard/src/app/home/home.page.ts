import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private activedRouter: ActivatedRoute, private alertController: AlertController, private router: Router, public  httpClient : HttpClient) {
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
    const url = 'http://localhost:8000/api/obtener/info/usuario';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    const header = new FormData();
    header.append('username', this.accessToken);

    this.httpClient.get(url, { headers }).subscribe(
      (data: any) => {
        this.usuarioInfo = data;
        this.username = this.usuarioInfo.username;
        this.urlFoto = this.usuarioInfo.url_foto;
        this.email = this.usuarioInfo.email;
        this.titulos = this.usuarioInfo.titulos;
        this.logros = this.usuarioInfo.logros;
        this.coleccion = Object.keys(this.usuarioInfo.coleccion);
        this.presentAlert(JSON.stringify(this.usuarioInfo));
      },
      (error) => {
        this.presentAlert(error);
      }
    )
    this.presentAlert(this.accessToken);
  }

  //falta implementar que cargue con titulos y logros
  
}

import { Component, OnInit } from '@angular/core';
import {IFigura} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.page.html',
  styleUrls: ['./figuras.page.scss'],
})
export class FigurasPage implements OnInit {
  figurasUsuario: any[] = [];
  accessToken='';
  category = 'figuras';
  iditem = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService, private alertController: AlertController, private navController: NavController) {
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
    this.servicio.obtenerColeccionUsuario(this.accessToken).subscribe((data: any) => {
      if (data && data.figuras) {
        this.figurasUsuario = data.figuras.map((figuras: any) => ({
          nombre: figuras.nombre,
          url_foto: figuras.url_foto,
          _id: figuras._id
        }));
      }
    });
  }

  item(id: string){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category,
        iditemEnviado: this.iditem
      }
    }
    this.router.navigate(['./itemfigura'], navigationExtras);
  }

  async abrirModal() {
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category
      }
    }
    this.router.navigate(['./modal-crear-figura'], navigationExtras);
  }

  home(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }

  crearTarjeta(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['/tarjeta'], navigationExtras);
  }

  volverAtras() {
    this.navController.pop();
  }

}

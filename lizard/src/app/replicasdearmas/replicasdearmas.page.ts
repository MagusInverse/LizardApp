import { Component, OnInit } from '@angular/core';
import {IArma} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-replicasdearmas',
  templateUrl: './replicasdearmas.page.html',
  styleUrls: ['./replicasdearmas.page.scss'],
})
export class ReplicasdearmasPage implements OnInit {

  armasUsuario: IArma[] = []; // array con las armas que el usuario ha añadido a su colección
  accessToken='';
  category = 'armas';
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
      if (data && data.armas) {
        this.armasUsuario = data.armas.map((armas: any) => ({
          nombre: armas.nombre,
          url_foto: armas.url_foto,
          _id: armas._id
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
    this.router.navigate(['./itemreplica'], navigationExtras);
  }

  async abrirModal() {
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category
      }
    }
    this.router.navigate(['./modal-crear-arma'], navigationExtras);
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

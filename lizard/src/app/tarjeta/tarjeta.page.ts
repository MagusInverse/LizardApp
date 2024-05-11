import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {
  // configuración de la tarjeta (color y fuente)
  colorTarjeta1: string = '';
  colorTarjeta2: string = '';
  colorTarjeta3: string = '';
  fuenteTarjeta: string = '';
  // datos del usuario
  urlFoto: string = '';
  username: string = '';
  ultimoTitulo: string = '';
  // cantidad de items por tipo de colección
  cantLibros: number = 0;
  cantFiguras: number = 0;
  cantVideojuegos: number = 0;
  cantReplicaArmas: number = 0;
  cantCartas: number = 0;

  accessToken='';


  constructor(private activedRouter: ActivatedRoute, private router: Router, private modalController: ModalController, private navController: NavController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      }
    })
   }


  ngOnInit() {
  }
 
  async generarTarjeta(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        colorTarjetaEnviado1: this.colorTarjeta1,
        colorTarjetaEnviado2: this.colorTarjeta2,
        colorTarjetaEnviado3: this.colorTarjeta3,
        fuenteTarjetaEnviado: this.fuenteTarjeta
      }
    }
    this.router.navigate(['./modal-tarjeta'], navigationExtras);
  }

  volverAtras() {
    this.navController.pop();
  }

}

import { Component, OnInit } from '@angular/core';
import {ICarta} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
})
export class CartasPage implements OnInit {
  cartasUsuario: ICarta[] = []; 
  accessToken='';
  category = 'cartas';
  iditem = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      }
    })
   }

  ngOnInit() {
  }

  item(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category,
        iditemEnviado: this.iditem
      }
    }
    this.router.navigate(['./itemcarta'], navigationExtras);
  }

  async abrirModal() {
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category
      }
    }
    this.router.navigate(['./modal-crear-carta'], navigationExtras);
  }

}

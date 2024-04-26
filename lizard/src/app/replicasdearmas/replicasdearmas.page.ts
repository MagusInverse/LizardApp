import { Component, OnInit } from '@angular/core';
import {IArma} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-replicasdearmas',
  templateUrl: './replicasdearmas.page.html',
  styleUrls: ['./replicasdearmas.page.scss'],
})
export class ReplicasdearmasPage implements OnInit {

  armasUsuario: IArma[] = []; // array con las armas que el usuario ha añadido a su colección
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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  accessToken='';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService, private navController: NavController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      }
    })
   }

  ngOnInit() {
  }

  libros(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./libros'], navigationExtras);
  }

  figuras(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./figuras'], navigationExtras);
  }

  replicas(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./replicasdearmas'], navigationExtras);
  }

  cartas(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./cartas'], navigationExtras);
  }

  juegos(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken
      }
    }
    this.router.navigate(['./juegos'], navigationExtras);
  }

  volverAtras() {
    this.navController.pop();
  }

  

}

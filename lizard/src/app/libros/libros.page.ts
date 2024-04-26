import { Component, OnInit } from '@angular/core';
import {ILibro} from '../coleccionInterfaces';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  librosUsuario: ILibro[] = []; // array con los libros que el usuario ha añadido a su colección
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

  item(){
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category,
        iditemEnviado: this.iditem
      }
    }
    this.router.navigate(['./itemlibro'], navigationExtras);
  }

  async abrirModal() {
    let navigationExtras: NavigationExtras = {
      state: {
        accessTokenEnviado: this.accessToken,
        categoryEnviado: this.category
      }
    }
    this.router.navigate(['./modal-crear-libro'], navigationExtras);
  }

  ngOnInit() {
  }

}

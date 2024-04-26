import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

interface Titulo {
  nombre: string;
  fecha: string;
}

interface Logro {
  nombre: string;
  fecha: string;
}

@Component({
  selector: 'app-titulosylogros',
  templateUrl: './titulosylogros.page.html',
  styleUrls: ['./titulosylogros.page.scss'],
})
export class TitulosylogrosPage implements OnInit {

  titulos: Titulo[] = [] // array para guardar los títulos del usuario
  logros: Logro[] = [] // array para guardar los logros del usuario
  accessToken='';
  
  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      }
    })
   }

  ngOnInit() {
    //llamar a servicio que trae los logros y titulos del usaurio
  }

}

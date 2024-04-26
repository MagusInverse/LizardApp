import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-modal-tarjeta',
  templateUrl: './modal-tarjeta.page.html',
  styleUrls: ['./modal-tarjeta.page.scss'],
})
export class ModalTarjetaPage implements OnInit {

  accessToken='';
  colorTarjeta: string = '';
  fuenteTarjeta: string = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
        this.colorTarjeta = this.router.getCurrentNavigation()?.extras?.state?.['colorTarjetaEnviado'];
        this.fuenteTarjeta = this.router.getCurrentNavigation()?.extras?.state?.['fuenteTarjetaEnviado'];
      }
    })
   }

  ngOnInit() {
  }

}

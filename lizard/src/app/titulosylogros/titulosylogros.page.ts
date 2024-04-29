import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { NavController } from '@ionic/angular';

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

  accessToken='';
  usuarioInfo: any;
  username: string = '';
  urlFoto: string = '';
  email: string = '';
  titulos: string[] = [];
  logros: string[] = [];
  coleccion: string[] = [];
  coleccionArray: { categoria: string, cantidad: number }[] = [];
  titulosArray: any[] = [];
  logrosArray: any[] = [];

  colorTarjeta: string = '';  
  colorTextot1: string = '';
  colorTextot2: string = '';
  colorTextot3: string = '';
  colorTextot4: string = '';
  colorTextol1: string = '';
  colorTextol2: string = '';
  colorTextol3: string = '';
  colorTextol4: string = '';
  colorTextol5: string = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService, private navController: NavController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
      }
    })
   }

  ngOnInit() {
    this.servicio.informacionUsuario(this.accessToken).subscribe(
      (data: any) => {
        this.username = data.username;
        this.urlFoto = data.url_foto;
        this.email = data.email;
        this.titulos = data.titulos;
        this.logros = data.logros;
        this.titulosArray = [...this.titulos];
        this.logrosArray = [...this.logros];
        this.coleccion = data.coleccion;
        this.coleccionArray = Object.entries(this.coleccion).map(([categoria, cantidad]) => ({ categoria, cantidad: parseInt(cantidad) }));

        this.titulosArray.forEach((titulo) => {
          if (titulo.nombre === 'novato') {
              this.colorTextot1 = 'crimson';
          } else if (titulo.nombre === 'aficionado') {
              this.colorTextot2 = 'crimson';
          } else if (titulo.nombre === 'coleccionista') {
              this.colorTextot3 = 'crimson';
          } else if (titulo.nombre === 'maestro') {
              this.colorTextot4 = 'crimson';
          }
        });

        this.logrosArray.forEach((logros) => {
          if (logros.nombre === 'A') {
              this.colorTextol1 = 'crimson';
          } else if (logros.nombre === 'B') {
              this.colorTextol2 = 'crimson';
          } else if (logros.nombre === 'C') {
              this.colorTextol3 = 'crimson';
          } else if (logros.nombre === 'D') {
              this.colorTextol4 = 'crimson';
          } else if (logros.nombre === 'E') {
            this.colorTextol5 = 'crimson';
        }
          
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  volverAtras() {
    this.navController.pop();
  }

}

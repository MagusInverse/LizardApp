import { Component, OnInit } from '@angular/core';
import {IVideojuego} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itemjuego',
  templateUrl: './itemjuego.page.html',
  styleUrls: ['./itemjuego.page.scss'],
})
export class ItemjuegoPage implements OnInit {

  videojuego: IVideojuego = {
    _id: "",
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de un videojuego
    plataforma: "",
    genero: "",
    creador: "",
    caracteristicas: "",
  }

  accessToken='';
  category = '';
  iditem = '';

  constructor(private activedRouter: ActivatedRoute, private router: Router, private servicio: MainServiceService, private alertController: AlertController, private navController: NavController) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.accessToken = this.router.getCurrentNavigation()?.extras?.state?.['accessTokenEnviado'];
        this.category = this.router.getCurrentNavigation()?.extras?.state?.['categoryEnviado'];
        this.iditem = this.router.getCurrentNavigation()?.extras?.state?.['iditemEnviado'];
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

  cambiarEstadoEditable(idElemento: string) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
      if (elemento.hasAttribute("readonly")) {
        elemento.removeAttribute("readonly");
        elemento.focus();
      }
      else {
        elemento.setAttribute("readonly", "true");
      }
    }
  }

  actualizarItem(){
    this.servicio.actualizarItem(this.videojuego, this.accessToken).subscribe(
      (response) => {
        this.presentAlert('Item actualizado exitosamente.');
      },
      (error) => {
        this.presentAlert(JSON.stringify(error));
      }
    );
  }


  eliminarItem(){
    this.servicio.deleteItem(this.category, this.iditem, this.accessToken).subscribe(
      (response) => {
        this.presentAlert('Item eliminado.');
        let navigationExtras: NavigationExtras = {
          state: {
            accessTokenEnviado: this.accessToken
          }
        }
        this.router.navigate(['/categorias'], navigationExtras);
      },
      (error) => {
        console.log(error);
      }
    );
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

  ngOnInit() {
    this.servicio.obtenerItemCat(this.category, this.iditem, this.accessToken).subscribe(
      (data: any) => {
        this.videojuego.fecha_adquisicion = data.fecha_adquisicion;
        this.videojuego.url_foto = data.url_foto;
        this.videojuego.nombre = data.nombre;
        this.videojuego.tipo = data.tipo;
        this.videojuego.descripcion = data.descripcion;
        this.videojuego.plataforma = data.plataforma;
        this.videojuego.genero = data.genero;
        this.videojuego.creador = data.creador;
        this.videojuego.caracteristicas = data.caracteristicas;
        this.videojuego._id = this.iditem;
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

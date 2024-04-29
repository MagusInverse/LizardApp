import { Component, OnInit } from '@angular/core';
import {IFigura} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itemfigura',
  templateUrl: './itemfigura.page.html',
  styleUrls: ['./itemfigura.page.scss'],
})
export class ItemfiguraPage implements OnInit {

  figura: IFigura = {
    _id: "",
    // datos comunes
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de figura
    origen: "",
    tamano: 0,
    material: "",
    empresa: "",
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

  ngOnInit() {
    this.servicio.obtenerItemCat(this.category, this.iditem, this.accessToken).subscribe(
      (data: any) => {
        this.figura.fecha_adquisicion = data.fecha_adquisicion;
        this.figura.url_foto = data.url_foto;
        this.figura.nombre = data.nombre;
        this.figura.tipo = data.tipo;
        this.figura.descripcion = data.descripcion;
        this.figura.origen = data.origen;
        this.figura.tamano = data.tamano;
        this.figura.material = data.material;
        this.figura.empresa = data.empresa;
        this.figura._id = this.iditem;
      },
      (error) => {
        console.log(error);
      } 
    );
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
    this.servicio.actualizarItem(this.figura, this.accessToken).subscribe(
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

  volverAtras() {
    this.navController.pop();
  }


}

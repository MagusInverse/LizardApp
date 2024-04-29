import { Component, OnInit } from '@angular/core';
import {IArma} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itemreplica',
  templateUrl: './itemreplica.page.html',
  styleUrls: ['./itemreplica.page.scss'],
})
export class ItemreplicaPage implements OnInit {

  arma: IArma = {
    // datos comunes
    _id: "", // no mostrar id en la vista, solo usar para eliminar o editar
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de arma
    material: "",
    tamano: 0,
    peso: 0,
    fabricante: "",
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
    if (elemento) { // Solo continua si elemento no es null.
      // si tiene el atributo readonly, lo elimina
      if (elemento.hasAttribute("readonly")) {
        elemento.removeAttribute("readonly");
        elemento.focus();
      }
      // si no lo tiene, se lo pone
      else {
        elemento.setAttribute("readonly", "true");
      }
    }
  }

  actualizarItem(){
    this.servicio.actualizarItem(this.arma, this.accessToken).subscribe(
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
        this.arma.fecha_adquisicion = data.fecha_adquisicion;
        this.arma.url_foto = data.url_foto;
        this.arma.nombre = data.nombre;
        this.arma.tipo = data.tipo;
        this.arma.descripcion = data.descripcion;
        this.arma.material = data.material;
        this.arma.tamano = data.tamano;
        this.arma.peso = data.peso;
        this.arma.fabricante = data.fabricante;
        this.arma._id = this.iditem;
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

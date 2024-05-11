import { Component, OnInit } from '@angular/core';
import {ILibro} from '../coleccionInterfaces';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-itemlibro',
  templateUrl: './itemlibro.page.html',
  styleUrls: ['./itemlibro.page.scss'],
})
export class ItemlibroPage implements OnInit {
  libro: ILibro = {
    // datos comunes
    _id: "", // no mostrar id en la vista, solo usar para eliminar o editar
    fecha_adquisicion: "",
    url_foto: "",
    nombre: "",
    tipo: "",
    descripcion: "",
    // datos específicos de arma
    autor: "",
    editorial: "", 
    genero: "",
    edicion: "",
    isbn: "",
    paginas: 0,
    anio_publicacion: 0,
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
        this.libro.fecha_adquisicion = data.fecha_adquisicion;
        this.libro.url_foto = data.url_foto;
        this.libro.nombre = data.nombre;
        this.libro.tipo = data.tipo;
        this.libro.descripcion = data.descripcion;
        this.libro.autor = data.autor;
        this.libro.editorial = data.editorial;
        this.libro.genero = data.genero;
        this.libro.edicion = data.edicion;
        this.libro.isbn = data.isbn;
        this.libro.paginas = data.paginas;
        this.libro.anio_publicacion = data.anio_publicacion;
        this.libro._id = this.iditem;
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
    this.servicio.actualizarItem(this.libro, this.accessToken).subscribe(
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

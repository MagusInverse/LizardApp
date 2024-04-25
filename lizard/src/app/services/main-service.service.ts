import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
/*
* Servicios genericos para 
*
*/
@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  // Variables Usar
  accessToken='';
  usuarioInfo: any;
  username: string = '';
  urlFoto: string = '';
  email: string = '';
  titulos: string[] = [];
  logros: string[] = [];
  coleccion: string[] = [];

  // Endpoints API
  URL_AUTHENTICATE = 'http://localhost:8000/api/autenticacion/token';
  URL_REGISTRO = 'http://localhost:8000/api/autenticacion/registro';
  URL_RESET_PASS = 'http://localhost:8000/api/autenticacion/actualizar/contrasena';
  URL_INFO_USER = 'http://localhost:8000/api/obtener/info/usuario';
  URL_ITEM_LIST = 'http://localhost:8000/api/items/obtener/items';
  URL_ITEM_LIST_CAT = 'http://localhost:8000/api/items/obtener/item/{categoria}/{id_item}';
  URL_INSERT_ITEM = 'http://localhost:8000/api/items/insertar/item/';
  URL_UPDATE_ITEM = 'http://localhost:8000/api/items/actualizar/item/';
  URL_DELETE_ITEM = 'http://localhost:8000/api/items/eliminar/item/{categoria}/{id_item}';
  URL_ADD_CAT = 'http://localhost:8000/api/categorias/agregar/categoria/{nombre_categoria}';
  URL_TOP_10 = 'http://localhost:8000/api/obtener/top/10';
  URL_VALIDATE_USER = 'http://localhost:8000/api/autenticacion/validar/usuario/{usuario}/{email}';
  URL_INSERT_TITLE = 'http://localhost:8000/api/gamificacion/insertar/{titulos}';
  URL_INSERT_ACHIEVEMENT ='http://localhost:8000/api/gamificacion/insertar/{logros}';



  constructor(private alertController: AlertController, public  httpClient : HttpClient) { }
  //Calcular sistema de titulos

  //calcular sistema de logros

  //Alertas
  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  inicioSesion(usuario: any, clave: any): Observable<any> {
    const body = new FormData();
    body.append('username', usuario);
    body.append('password', clave);

    return this.httpClient.post(this.URL_AUTHENTICATE, body);
  }

  informacionUsuario(accessToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.get(this.URL_INFO_USER, { headers });
  }

  registrarUsuario(username: string, correo: string, clave: string, url: string): Observable<any> {
    const userData = {
      username: username,
      email: correo,
      password: clave,
      url_foto: url
    };

    return this.httpClient.post(this.URL_REGISTRO, userData);
  }

  resetearClave(username: string, correo: string, clave: string) {
    const userData = {
      username: username,
      email: correo,
      nueva_password: clave
    };

    return this.httpClient.post(this.URL_RESET_PASS, userData);
  }

  validateUser(username: string, correo: string): Observable<any> {
    const url = this.URL_VALIDATE_USER.replace('{usuario}', username).replace('{email}', correo);
    
    return this.httpClient.get(url);
  }

  obtenerTop10Usuarios(): Observable<any> {
    return this.httpClient.get(this.URL_TOP_10);
  }

  // Colecciones

  obtenerItemsColeccion(){

  }

  obtenerItemCatId(){

  }

  actualizarItem(){

  }

  insertarItem(){

  }

  agregarCategoriaUsuario(){

  }
}

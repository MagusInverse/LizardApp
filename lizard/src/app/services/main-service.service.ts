import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  accessToken = '';
  usuarioInfo: any;
  username = '';
  urlFoto = '';
  email = '';
  titulos: string[] = [];
  logros: string[] = [];
  coleccion: string[] = [];

  URL_AUTHENTICATE = 'http://localhost:8000/api/autenticacion/token';
  URL_REGISTRO = 'http://localhost:8000/api/autenticacion/registro';
  URL_RESET_PASS = 'http://localhost:8000/api/autenticacion/actualizar/contrasena';
  URL_INFO_USER = 'http://localhost:8000/api/obtener/info/usuario';
  URL_TOP_10 = 'http://localhost:8000/api/obtener/top/10';
  URL_VALIDATE_USER = 'http://localhost:8000/api/autenticacion/validar/usuario/{usuario}/{email}';
  URL_INSERT_TITLE = 'http://localhost:8000/api/gamificacion/insertar/titulos';
  URL_INSERT_ACHIVEMENT = 'http://localhost:8000/api/gamificacion/insertar/logros';
  URL_ITEM_USUARIO = 'http://localhost:8000/api/items/obtener/items';

  constructor(private alertController: AlertController, private httpClient: HttpClient) { }
  //titulos
  obtenerTitulos(){
    //traer titulos del usaurio

  }

  insertarTitulos(){
    //llamar funcion obtener titulos
    //condicion 1{ titulo: 'Aficionado', coleccionesMinimas: 2 }
    //condicion 2{ titulo: 'Coleccionista', coleccionesMinimas: 5 }
    //condicion 3{ titulo: 'Maestro', coleccionesMinimas: 6 }
    //traer toda la info del usuario con URL_INFO_USER
    //verificar condiciones
    //si usaurio cumple condiciones llenar un array de titulos
    //despues de calcular eso, insertar titulos con URL_INSERT_TITLE

  }

  //logros
  obtenerLogros(){
    //traer titulos del usaurio
  }

  insertarLogros(){
    //llamar funcion obtener logros
    //condicion 1{ logro: 'A', itemsminimo: 1 }
    //condicion 1{ logro: 'B', itemsminimo: 2 }
    //condicion 1{ logro: 'C', itemsminimo: 5 }
    //condicion 1{ logro: 'D', itemsminimo: 10 }
    //condicion 1{ logro: 'E', itemsminimo: 20 }
    //traer toda la info del usuario con URL_INFO_USER
    //verificar condiciones
    //si usaurio cumple condiciones llenar un array de logros
    //despues de calcular eso, insertar titulos con URL_INSERT_logro

  }

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

    // asignar el token para ser usado por el auth-guard service
    const request = this.httpClient.post(this.URL_AUTHENTICATE, body);
    request.subscribe((data: any) => {
      this.accessToken = data.access_token;
    })
    return request;

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

    //al registrar usuario se debe insertar automaticamente el titulo novato
    //fecha del insert de titulo se otorga al momento de crear la cuenta
    //insertar todas las categorias al crear usaurio

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
  obtenerColeccionUsuario(accessToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.get(this.URL_ITEM_USUARIO, { headers });
  }

  obtenerItemCat(){
    //llamar obtener colecciones usuario
    //buscar la catergoria especifica (pasarla por parametro)
    //listar todos los items de esa categoria
  }

  //crud items
  actualizarItem(){

  }

  insertarItem(){

  }

  eliminarItem(){

  }

}

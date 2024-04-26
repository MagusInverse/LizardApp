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

  constructor(private alertController: AlertController, private httpClient: HttpClient) { }
  //titulos
  asignarTitulos(usuario: any): Observable<any> {
    const condicionesTitulos = [
      { titulo: 'Aficionado', coleccionesMinimas: 2 },
      { titulo: 'Coleccionista', coleccionesMinimas: 5 },
      { titulo: 'Maestro', coleccionesMinimas: 6 }
    ];
    const tieneTitulo = (titulo: string) => usuario.titulos.includes(titulo);

    condicionesTitulos.forEach(condicion => {
      if (!tieneTitulo(condicion.titulo) && usuario.coleccion.length >= condicion.coleccionesMinimas) {
        usuario.titulos.push(condicion.titulo);
      }
    });

    return this.actualizarInfoUsuario(usuario);
  }

  private actualizarInfoUsuario(usuario: any): Observable<any> {
    const titulosArray = usuario.titulos.map((titulo: any) => ({ nombre: titulo, fecha: new Date().toISOString().split('T')[0] }));

    return this.httpClient.post(this.URL_INFO_USER, usuario).pipe(
      switchMap(() => {
        const body = JSON.stringify(titulosArray);
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        });
        return this.httpClient.post(this.URL_INSERT_TITLE, body, { headers });
      }),
      catchError((error) => {
        return throwError('Error al actualizar información del usuario.');
      })
    );
  }

  //logros

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

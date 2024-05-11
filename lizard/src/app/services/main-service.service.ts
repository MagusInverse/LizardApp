import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

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
  URL_INSERT_ITEM = 'http://localhost:8000/api/items/insertar/item/';
  URL_MOD_ITEM = 'http://localhost:8000/api/items/actualizar/item/';
  URL_DEL_ITEM = 'http://localhost:8000/api/items/eliminar/item/{categoria}/{id_item}';
  URL_ITEM_CATEGORY = 'http://localhost:8000/api/items/obtener/item/{categoria}/{id_item}';

  constructor(private alertController: AlertController, private httpClient: HttpClient) { }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //titulos
  obtenerTitulos(accessToken: any): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.get<any>(this.URL_INFO_USER, { headers }).pipe(
      map(userData => userData.titulos)
    );
  }

  insertarTitulos(accessToken: any): Observable<any> {
    return this.obtenerTitulos(accessToken).pipe(
      switchMap(titulosUsuario => {
        const tieneAficionado = titulosUsuario.includes('Aficionado');
        const tieneColeccionista = titulosUsuario.includes('Coleccionista');
        const tieneMaestro = titulosUsuario.includes('Maestro');
        const titulosAInsertar = [];
        if (!tieneAficionado && this.coleccion.length >= 2) {
          titulosAInsertar.push({ nombre: 'Aficionado', fecha: new Date().toISOString() });
        }
        if (!tieneColeccionista && this.coleccion.length >= 5) {
          titulosAInsertar.push({ nombre: 'Coleccionista', fecha: new Date().toISOString() });
        }
        if (!tieneMaestro && this.coleccion.length >= 6) {
          titulosAInsertar.push({ nombre: 'Maestro', fecha: new Date().toISOString() });
        }
        if (titulosAInsertar.length > 0) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          });

          return this.httpClient.post(this.URL_INSERT_TITLE, titulosAInsertar, { headers }).pipe(
            catchError((error) => {
              return throwError('Error al insertar los títulos.');
            })
          );
        } else {
          return new Observable<void>(); 
        }
      })
    );
  }

  //logros
  obtenerLogros(accessToken: any): Observable<string[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.get<any>(this.URL_INFO_USER, { headers }).pipe(
      map(userData => userData.titulos)
    );
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
    //si el usuario tiene el logro no se inserta, si el usuario no lo tiene
    //se calcula el titulo que le corresponde segun su informacion
    //despues de calcular eso, insertar titulos con URL_INSERT_ACHIVEMENT

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

  obtenerItemCat(categoria: string, idItem: string, accessToken: any): Observable<any> {
    const url = this.URL_ITEM_CATEGORY.replace('{categoria}', categoria).replace('{id_item}', idItem);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.get(url, { headers });
  }

  //crud items
  actualizarItem(data: any, accessToken: string): Observable<any> {
    const url = this.URL_MOD_ITEM;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  
    return this.httpClient.put(url, data, { headers });
  }
  

  insertarItem(itemData: any, accessToken: any): Observable<any> {
    const url = this.URL_INSERT_ITEM;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.post(url, itemData, { headers });
  }

  deleteItem(categoria: string, idItem: string, accessToken: any): Observable<any> {
    const url = this.URL_DEL_ITEM.replace('{categoria}', categoria).replace('{id_item}', idItem);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.httpClient.delete(url, { headers });
  }

}

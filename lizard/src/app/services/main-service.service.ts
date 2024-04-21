import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/*
* Servicios genericos para 
*
*/
@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  // Endpoints API
  URL_AUTHENTICATE = 'http://localhost:8000/api/autenticacion/token';
  URL_REGISTRO = 'http://localhost:8000/api/autenticacion/registro';
  URL_RESET_PASS = 'http://localhost:8000/api/autenticacion/actualizar/contrasena';
  URL_INFO_USER = 'http://localhost:8000/api/obtener/info/usuario';
  URL_ITEM_LIST = 'http://localhost:8000';
  URL_INSERT_ITEM = 'http://localhost:8000';
  URL_UPDATE_ITEM = 'http://localhost:8000';
  URL_DELETE_ITEM = 'http://localhost:8000';
  URL_ADD_CAT = 'http://localhost:8000';
  URL_LIST_CAT = 'http://localhost:8000';
  URL_TOP_10 = 'http://localhost:8000';



  // Variables Usar



  constructor() { }

  //Calcular sistema de titulos

  //calcular sistema de logros

}

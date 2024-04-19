import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  async registrarUsuario(username: string, password: string, email: string){
    const body = {
      username: username,
      password: password,
      email: email
    }
    const response = await axios.post(`${environment.apiUrl}/api/autenticacion/registro`, body);
    const mensaje = {
      status: 200,
      data: response.data
    }
    return mensaje;
  }
}

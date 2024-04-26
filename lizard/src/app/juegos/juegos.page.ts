import { Component, OnInit } from '@angular/core';
import {IVideojuego} from '../coleccionInterfaces';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  juegosUsuario: IVideojuego[] = []; // array con los juegos que el usuario ha añadido a su colección

  constructor() { }

  ngOnInit() {
  }

}

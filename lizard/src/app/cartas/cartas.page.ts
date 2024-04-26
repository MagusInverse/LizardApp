import { Component, OnInit } from '@angular/core';
import {ICarta} from '../coleccionInterfaces';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
})
export class CartasPage implements OnInit {
  cartasUsuario: ICarta[] = []; // array con las cartas que el usuario ha añadido a su colección

  constructor() { }

  ngOnInit() {
  }

}

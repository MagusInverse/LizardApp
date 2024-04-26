import { Component, OnInit } from '@angular/core';
import {IFigura} from '../coleccionInterfaces';

@Component({
  selector: 'app-figuras',
  templateUrl: './figuras.page.html',
  styleUrls: ['./figuras.page.scss'],
})
export class FigurasPage implements OnInit {
  figurasUsuario: IFigura[] = []; // array con las figuras que el usuario ha añadido a su colección

  constructor() { }

  ngOnInit() {
  }

}

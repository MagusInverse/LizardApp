import { Component, OnInit } from '@angular/core';
import {ILibro} from '../coleccionInterfaces';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  librosUsuario: ILibro[] = []; // array con los libros que el usuario ha añadido a su colección

  constructor() { }

  ngOnInit() {
  }

}

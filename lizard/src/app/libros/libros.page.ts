import { Component, OnInit } from '@angular/core';
import {ILibro} from '../coleccionInterfaces';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
})
export class LibrosPage implements OnInit {
  librosUsuario: ILibro[] = []; // array con los libros que el usuario ha añadido a su colección

  constructor(private modalController: ModalController) { }

  async abrirModal() {}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

interface Titulo {
  nombre: string;
  fecha: string;
}

interface Logro {
  nombre: string;
  fecha: string;
}

@Component({
  selector: 'app-titulosylogros',
  templateUrl: './titulosylogros.page.html',
  styleUrls: ['./titulosylogros.page.scss'],
})
export class TitulosylogrosPage implements OnInit {

  titulos: Titulo[] = [] // array para guardar los títulos del usuario
  logros: Logro[] = [] // array para guardar los logros del usuario

  constructor() { }

  ngOnInit() {
  }

}

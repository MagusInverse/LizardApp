import { Component, OnInit } from '@angular/core';
import {IArma} from '../coleccionInterfaces';

@Component({
  selector: 'app-replicasdearmas',
  templateUrl: './replicasdearmas.page.html',
  styleUrls: ['./replicasdearmas.page.scss'],
})
export class ReplicasdearmasPage implements OnInit {

  armasUsuario: IArma[] = []; // array con las armas que el usuario ha añadido a su colección

  constructor() { }

  ngOnInit() {
  }

}

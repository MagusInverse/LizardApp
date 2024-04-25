import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {
  // configuración de la tarjeta (color y fuente)
  colorTarjeta: string = '';
  fuenteTarjeta: string = '';
  // datos del usuario
  urlFoto: string = '';
  username: string = '';
  ultimoTitulo: string = '';
  // cantidad de items por tipo de colección
  cantLibros: number = 0;
  cantFiguras: number = 0;
  cantVideojuegos: number = 0;
  cantReplicaArmas: number = 0;
  cantCartas: number = 0;


  constructor() { }

  ngOnInit() {
  }
 
  generarTarjeta(){

  }



}

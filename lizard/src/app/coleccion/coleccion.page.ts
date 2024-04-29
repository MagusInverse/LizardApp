import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.page.html',
  styleUrls: ['./coleccion.page.scss'],
})
export class ColeccionPage implements OnInit {

  constructor(private navController: NavController) {}

  ngOnInit() {
  }

  volverAtras() {
    this.navController.pop();
  }

}

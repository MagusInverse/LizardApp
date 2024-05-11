import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.page.html',
  styleUrls: ['./elemento.page.scss'],
})
export class ElementoPage implements OnInit {

  constructor(private navController: NavController) {}

  ngOnInit() {
  }

  volverAtras() {
    this.navController.pop();
  }

}

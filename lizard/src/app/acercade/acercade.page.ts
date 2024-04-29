import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage implements OnInit {

  constructor(private navController: NavController) {}

  volverAtras() {
    this.navController.pop();
  }
  
  ngOnInit() {
  }

}

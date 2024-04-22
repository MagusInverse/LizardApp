import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalpass',
  templateUrl: './modalpass.page.html',
  styleUrls: ['./modalpass.page.scss'],
})
export class ModalpassPage implements OnInit {
  clave1: string = "";

  constructor(private modalController: ModalController) { }

cerrarModal() {
  this.modalController.dismiss();
}

  ngOnInit() {
  }

}

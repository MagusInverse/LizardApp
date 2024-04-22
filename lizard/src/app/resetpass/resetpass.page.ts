import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalpassPage } from '../modalpass/modalpass.page';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  

  constructor(private modalController: ModalController) { }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalpassPage
    });
  
  return await modal.present();

  }
  ngOnInit() {
  }
}

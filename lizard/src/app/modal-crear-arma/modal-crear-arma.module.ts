import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCrearArmaPageRoutingModule } from './modal-crear-arma-routing.module';

import { ModalCrearArmaPage } from './modal-crear-arma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCrearArmaPageRoutingModule
  ],
  declarations: [ModalCrearArmaPage]
})
export class ModalCrearArmaPageModule {}

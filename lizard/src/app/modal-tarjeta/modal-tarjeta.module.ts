import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTarjetaPageRoutingModule } from './modal-tarjeta-routing.module';

import { ModalTarjetaPage } from './modal-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTarjetaPageRoutingModule
  ],
  declarations: [ModalTarjetaPage]
})
export class ModalTarjetaPageModule {}

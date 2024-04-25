import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCrearCartaPageRoutingModule } from './modal-crear-carta-routing.module';

import { ModalCrearCartaPage } from './modal-crear-carta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCrearCartaPageRoutingModule
  ],
  declarations: [ModalCrearCartaPage]
})
export class ModalCrearCartaPageModule {}

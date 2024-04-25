import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCrearVideojuegoPageRoutingModule } from './modal-crear-videojuego-routing.module';

import { ModalCrearVideojuegoPage } from './modal-crear-videojuego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCrearVideojuegoPageRoutingModule
  ],
  declarations: [ModalCrearVideojuegoPage]
})
export class ModalCrearVideojuegoPageModule {}

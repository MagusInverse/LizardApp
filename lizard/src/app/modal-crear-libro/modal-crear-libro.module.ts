import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCrearLibroPageRoutingModule } from './modal-crear-libro-routing.module';

import { ModalCrearLibroPage } from './modal-crear-libro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCrearLibroPageRoutingModule
  ],
  declarations: [ModalCrearLibroPage]
})
export class ModalCrearLibroPageModule {}

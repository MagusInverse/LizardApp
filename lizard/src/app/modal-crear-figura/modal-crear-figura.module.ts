import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCrearFiguraPageRoutingModule } from './modal-crear-figura-routing.module';

import { ModalCrearFiguraPage } from './modal-crear-figura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCrearFiguraPageRoutingModule
  ],
  declarations: [ModalCrearFiguraPage]
})
export class ModalCrearFiguraPageModule {}

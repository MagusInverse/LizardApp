import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalpassPageRoutingModule } from './modalpass-routing.module';

import { ModalpassPage } from './modalpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalpassPageRoutingModule
  ],
  declarations: [ModalpassPage]
})
export class ModalpassPageModule {}

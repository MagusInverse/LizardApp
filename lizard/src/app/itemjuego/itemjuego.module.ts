import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemjuegoPageRoutingModule } from './itemjuego-routing.module';

import { ItemjuegoPage } from './itemjuego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemjuegoPageRoutingModule
  ],
  declarations: [ItemjuegoPage]
})
export class ItemjuegoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartasPageRoutingModule } from './cartas-routing.module';

import { CartasPage } from './cartas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartasPageRoutingModule
  ],
  declarations: [CartasPage]
})
export class CartasPageModule {}

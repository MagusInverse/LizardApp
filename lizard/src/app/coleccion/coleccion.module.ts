import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColeccionPageRoutingModule } from './coleccion-routing.module';

import { ColeccionPage } from './coleccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColeccionPageRoutingModule
  ],
  declarations: [ColeccionPage]
})
export class ColeccionPageModule {}

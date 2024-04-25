import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegosPageRoutingModule } from './juegos-routing.module';

import { JuegosPage } from './juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegosPageRoutingModule
  ],
  declarations: [JuegosPage]
})
export class JuegosPageModule {}

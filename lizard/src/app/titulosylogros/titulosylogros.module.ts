import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TitulosylogrosPageRoutingModule } from './titulosylogros-routing.module';

import { TitulosylogrosPage } from './titulosylogros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitulosylogrosPageRoutingModule
  ],
  declarations: [TitulosylogrosPage]
})
export class TitulosylogrosPageModule {}

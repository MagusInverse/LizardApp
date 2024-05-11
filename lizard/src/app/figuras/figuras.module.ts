import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FigurasPageRoutingModule } from './figuras-routing.module';

import { FigurasPage } from './figuras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FigurasPageRoutingModule
  ],
  declarations: [FigurasPage]
})
export class FigurasPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementoPageRoutingModule } from './elemento-routing.module';

import { ElementoPage } from './elemento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementoPageRoutingModule
  ],
  declarations: [ElementoPage]
})
export class ElementoPageModule {}

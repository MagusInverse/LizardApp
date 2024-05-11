import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemlibroPageRoutingModule } from './itemlibro-routing.module';

import { ItemlibroPage } from './itemlibro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemlibroPageRoutingModule
  ],
  declarations: [ItemlibroPage]
})
export class ItemlibroPageModule {}

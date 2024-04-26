import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemcartaPageRoutingModule } from './itemcarta-routing.module';

import { ItemcartaPage } from './itemcarta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemcartaPageRoutingModule
  ],
  declarations: [ItemcartaPage]
})
export class ItemcartaPageModule {}

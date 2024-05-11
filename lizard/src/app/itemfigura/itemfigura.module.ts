import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemfiguraPageRoutingModule } from './itemfigura-routing.module';

import { ItemfiguraPage } from './itemfigura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemfiguraPageRoutingModule
  ],
  declarations: [ItemfiguraPage]
})
export class ItemfiguraPageModule {}

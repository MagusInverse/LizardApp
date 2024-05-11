import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemreplicaPageRoutingModule } from './itemreplica-routing.module';

import { ItemreplicaPage } from './itemreplica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemreplicaPageRoutingModule
  ],
  declarations: [ItemreplicaPage]
})
export class ItemreplicaPageModule {}

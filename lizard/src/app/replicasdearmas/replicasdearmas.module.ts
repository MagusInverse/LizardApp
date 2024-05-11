import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReplicasdearmasPageRoutingModule } from './replicasdearmas-routing.module';

import { ReplicasdearmasPage } from './replicasdearmas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReplicasdearmasPageRoutingModule
  ],
  declarations: [ReplicasdearmasPage]
})
export class ReplicasdearmasPageModule {}

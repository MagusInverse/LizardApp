import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Top10PageRoutingModule } from './top10-routing.module';

import { Top10Page } from './top10.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Top10PageRoutingModule
  ],
  declarations: [Top10Page]
})
export class Top10PageModule {}

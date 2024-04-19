import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcercadePage } from './acercade.page';

const routes: Routes = [
  {
    path: '',
    component: AcercadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcercadePageRoutingModule {}

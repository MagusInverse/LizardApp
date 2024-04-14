import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementoPage } from './elemento.page';

const routes: Routes = [
  {
    path: '',
    component: ElementoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemlibroPage } from './itemlibro.page';

const routes: Routes = [
  {
    path: '',
    component: ItemlibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemlibroPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemfiguraPage } from './itemfigura.page';

const routes: Routes = [
  {
    path: '',
    component: ItemfiguraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemfiguraPageRoutingModule {}

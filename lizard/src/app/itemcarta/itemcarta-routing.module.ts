import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemcartaPage } from './itemcarta.page';

const routes: Routes = [
  {
    path: '',
    component: ItemcartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemcartaPageRoutingModule {}

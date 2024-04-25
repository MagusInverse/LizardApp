import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartasPage } from './cartas.page';

const routes: Routes = [
  {
    path: '',
    component: CartasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartasPageRoutingModule {}

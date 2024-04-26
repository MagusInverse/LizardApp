import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemjuegoPage } from './itemjuego.page';

const routes: Routes = [
  {
    path: '',
    component: ItemjuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemjuegoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTarjetaPage } from './modal-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTarjetaPageRoutingModule {}

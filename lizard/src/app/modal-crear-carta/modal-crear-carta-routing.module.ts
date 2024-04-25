import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCrearCartaPage } from './modal-crear-carta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearCartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearCartaPageRoutingModule {}

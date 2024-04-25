import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCrearArmaPage } from './modal-crear-arma.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearArmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearArmaPageRoutingModule {}

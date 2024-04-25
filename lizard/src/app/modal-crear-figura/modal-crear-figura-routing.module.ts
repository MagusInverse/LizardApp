import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCrearFiguraPage } from './modal-crear-figura.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearFiguraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearFiguraPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCrearLibroPage } from './modal-crear-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearLibroPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCrearVideojuegoPage } from './modal-crear-videojuego.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearVideojuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearVideojuegoPageRoutingModule {}

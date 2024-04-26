import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ModalCrearVideojuegoPage } from './modal-crear-videojuego.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearVideojuegoPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearVideojuegoPageRoutingModule {}

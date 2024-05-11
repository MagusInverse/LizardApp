import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ModalCrearCartaPage } from './modal-crear-carta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearCartaPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearCartaPageRoutingModule {}

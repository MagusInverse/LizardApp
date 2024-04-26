import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ModalCrearArmaPage } from './modal-crear-arma.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearArmaPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearArmaPageRoutingModule {}

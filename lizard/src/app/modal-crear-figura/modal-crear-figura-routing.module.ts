import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ModalCrearFiguraPage } from './modal-crear-figura.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearFiguraPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearFiguraPageRoutingModule {}

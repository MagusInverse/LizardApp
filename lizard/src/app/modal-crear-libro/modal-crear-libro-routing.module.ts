import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ModalCrearLibroPage } from './modal-crear-libro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearLibroPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCrearLibroPageRoutingModule {}

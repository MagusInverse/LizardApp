import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ColeccionPage } from './coleccion.page';

const routes: Routes = [
  {
    path: '',
    component: ColeccionPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColeccionPageRoutingModule {}

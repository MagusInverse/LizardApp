import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { FigurasPage } from './figuras.page';

const routes: Routes = [
  {
    path: '',
    component: FigurasPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FigurasPageRoutingModule {}

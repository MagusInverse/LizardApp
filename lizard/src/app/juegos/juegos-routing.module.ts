import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { JuegosPage } from './juegos.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosPageRoutingModule {}

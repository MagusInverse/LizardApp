import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { ReplicasdearmasPage } from './replicasdearmas.page';

const routes: Routes = [
  {
    path: '',
    component: ReplicasdearmasPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplicasdearmasPageRoutingModule {}

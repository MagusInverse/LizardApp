import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReplicasdearmasPage } from './replicasdearmas.page';

const routes: Routes = [
  {
    path: '',
    component: ReplicasdearmasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplicasdearmasPageRoutingModule {}

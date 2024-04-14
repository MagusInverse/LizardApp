import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TitulosylogrosPage } from './titulosylogros.page';

const routes: Routes = [
  {
    path: '',
    component: TitulosylogrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TitulosylogrosPageRoutingModule {}

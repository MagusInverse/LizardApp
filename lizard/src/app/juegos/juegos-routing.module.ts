import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegosPage } from './juegos.page';

const routes: Routes = [
  {
    path: '',
    component: JuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegosPageRoutingModule {}

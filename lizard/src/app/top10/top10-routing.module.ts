import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Top10Page } from './top10.page';

const routes: Routes = [
  {
    path: '',
    component: Top10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Top10PageRoutingModule {}

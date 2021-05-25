import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindlocPage } from './findloc.page';

const routes: Routes = [
  {
    path: '',
    component: FindlocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindlocPageRoutingModule {}

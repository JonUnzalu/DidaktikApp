import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZutabeaklotuPage } from './zutabeaklotu.page';

const routes: Routes = [
  {
    path: '',
    component: ZutabeaklotuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZutabeaklotuPageRoutingModule {}

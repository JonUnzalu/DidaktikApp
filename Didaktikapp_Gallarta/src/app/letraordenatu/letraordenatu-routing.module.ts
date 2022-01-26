import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LetraordenatuPage } from './letraordenatu.page';

const routes: Routes = [
  {
    path: '',
    component: LetraordenatuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetraordenatuPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestjokoaPage } from './testjokoa.page';

const routes: Routes = [
  {
    path: '',
    component: TestjokoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestjokoaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HutsuneakbetePage } from './hutsuneakbete.page';

const routes: Routes = [
  {
    path: '',
    component: HutsuneakbetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HutsuneakbetePageRoutingModule {}

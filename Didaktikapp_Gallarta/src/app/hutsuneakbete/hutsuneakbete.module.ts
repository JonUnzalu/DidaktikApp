import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HutsuneakbetePageRoutingModule } from './hutsuneakbete-routing.module';

import { HutsuneakbetePage } from './hutsuneakbete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HutsuneakbetePageRoutingModule
  ],
  declarations: [HutsuneakbetePage]
})
export class HutsuneakbetePageModule {}

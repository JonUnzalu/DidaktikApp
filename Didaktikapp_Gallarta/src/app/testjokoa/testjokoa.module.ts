import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestjokoaPageRoutingModule } from './testjokoa-routing.module';

import { TestjokoaPage } from './testjokoa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestjokoaPageRoutingModule
  ],
  declarations: [TestjokoaPage]
})
export class TestjokoaPageModule {}

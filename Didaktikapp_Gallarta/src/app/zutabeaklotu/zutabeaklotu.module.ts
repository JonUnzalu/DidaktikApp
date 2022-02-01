import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZutabeaklotuPageRoutingModule } from './zutabeaklotu-routing.module';

import { ZutabeaklotuPage } from './zutabeaklotu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZutabeaklotuPageRoutingModule
  ],
  declarations: [ZutabeaklotuPage]
})
export class ZutabeaklotuPageModule {}

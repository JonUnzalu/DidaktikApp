import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LetraordenatuPageRoutingModule } from './letraordenatu-routing.module';

import { LetraordenatuPage } from './letraordenatu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LetraordenatuPageRoutingModule
  ],
  declarations: [LetraordenatuPage]
})
export class LetraordenatuPageModule {}

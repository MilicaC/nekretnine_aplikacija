import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseAdPageRoutingModule } from './house-ad-routing.module';

import { HouseAdPage } from './house-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseAdPageRoutingModule
  ],
  declarations: [HouseAdPage]
})
export class HouseAdPageModule {}

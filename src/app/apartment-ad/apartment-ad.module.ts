import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartmentAdPageRoutingModule } from './apartment-ad-routing.module';

import { ApartmentAdPage } from './apartment-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartmentAdPageRoutingModule
  ],
  declarations: [ApartmentAdPage]
})
export class ApartmentAdPageModule {}

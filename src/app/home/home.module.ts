import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { RealEstateComponent } from '../real-estate/real-estate.component';
import { RealEstateModalComponent } from '../real-estate/real-estate-modal/real-estate-modal.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,RealEstateComponent, RealEstateModalComponent],
  entryComponents: [RealEstateModalComponent]
})
export class HomePageModule {}

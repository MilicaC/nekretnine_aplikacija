import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { RealEstateComponent } from '../real-estate/real-estate.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [SearchPage,RealEstateComponent,FilterModalComponent]

})
export class SearchPageModule {}

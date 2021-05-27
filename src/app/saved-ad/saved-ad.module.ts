import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedAdPageRoutingModule } from './saved-ad-routing.module';

import { SavedAdPage } from './saved-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedAdPageRoutingModule
  ],
  declarations: [SavedAdPage]
})
export class SavedAdPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentAdPage } from './apartment-ad.page';

const routes: Routes = [
  {
    path: '',
    component: ApartmentAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentAdPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseAdPage } from './house-ad.page';

const routes: Routes = [
  {
    path: '',
    component: HouseAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseAdPageRoutingModule {}

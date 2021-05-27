import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedAdPage } from './saved-ad.page';

const routes: Routes = [
  {
    path: '',
    component: SavedAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedAdPageRoutingModule {}

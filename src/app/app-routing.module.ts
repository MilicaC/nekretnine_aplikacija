import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'add-new-ad',
    loadChildren: () => import('./add-new-ad/add-new-ad.module').then( m => m.AddNewAdPageModule),
    // canLoad:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    //canLoad:[AuthGuard]
  },
  {
    path: 'saved-ad',
    loadChildren: () => import('./saved-ad/saved-ad.module').then( m => m.SavedAdPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'apartment-ad',
    loadChildren: () => import('./apartment-ad/apartment-ad.module').then( m => m.ApartmentAdPageModule)
  },
  {
    path: 'house-ad',
    loadChildren: () => import('./house-ad/house-ad.module').then( m => m.HouseAdPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/ad-details/ad-details.module').then( m => m.AdDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

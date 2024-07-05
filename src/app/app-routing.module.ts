import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'user', loadChildren: () => import('./auth/auth.module').then(m => m.UserModule) },
  { path: 'file', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'file', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

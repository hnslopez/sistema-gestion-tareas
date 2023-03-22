import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path:'*',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
     {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

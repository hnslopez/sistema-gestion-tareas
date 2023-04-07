import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularComponent } from './features/home/angular/angular.component';
import { ExpressComponent } from './features/home/express/express.component';
import { HomeComponent } from './features/home/main/home.component';
import { MongodbComponent } from './features/home/mongodb/mongodb.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Home' },
    component: HomeComponent
  },
  {
    path: 'login',
    data: { title: 'Login', navbar:false },
    component: LoginComponent
  },
  {
    path: '',
    children: [
      {
        path: 'angular',
        component: AngularComponent,
        data: { title: 'Angular' }
      },
      {
        path: 'express',
        component: ExpressComponent,
        data: { title: 'Express' }
      },
      {
        path: 'mongodb',
        component: MongodbComponent,
        data: { title: 'MongoDB' }
      },
    ]
  },

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

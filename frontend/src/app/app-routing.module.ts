import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularComponent } from './features/home/angular/angular.component';
import { ExpressComponent } from './features/home/express/express.component';
import { HomeComponent } from './features/home/main/home.component';
import { MongodbComponent } from './features/home/mongodb/mongodb.component';
import { LoginComponent } from './features/auth/login/login.component';
import { TasksComponent  } from './features/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Home' },
    component: HomeComponent
  },
  {
    path: 'login',
    data: { title: 'Login', navbar: false },
    component: LoginComponent
  },
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
  {
    path: 'task',
    //component: TaskListComponent,
    loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule),
    data: { title: 'Tasks' }
  },
  {
    path: 'projects',
    //component: TaskListComponent,
    loadChildren: () => import('./features/project/project.module').then(m => m.ProjectModule),
    data: { title: 'Project' }
  },
  {
    path: '**', // Captura todas las rutas no encontradas
    redirectTo: '', // Redirige a la página de inicio
    pathMatch: 'full'
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

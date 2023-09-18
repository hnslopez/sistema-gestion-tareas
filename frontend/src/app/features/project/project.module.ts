import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { CreateProjectComponent } from './create-project/create-project.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  }, {
    path: 'archived',
    component: ProjectComponent,
    data: { 
      filter: 'archived' 
    }
  },
  {
    path:'create',
    component:CreateProjectComponent,
  },
  {
    path:'completed',
    component:ProjectComponent,
    data: { 
      filter: 'completed' 
    }
  },  
  {
    path:'cancelled',
    component:ProjectComponent,
    data: { 
      filter: 'cancelled' 
    }
  },  {
    path:'pending',
    component:ProjectComponent,
    data: { 
      filter: 'pending' 
    }
  }
];

@NgModule({
  declarations: [
    ProjectComponent,
    CreateProjectComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,

  ]
})
export class ProjectModule { }

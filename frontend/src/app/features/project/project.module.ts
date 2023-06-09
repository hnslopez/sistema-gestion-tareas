import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesModule } from '../features.module';


const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  }
];

@NgModule({
  declarations: [
    ProjectComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturesModule,
    
  ]
})
export class ProjectModule { }

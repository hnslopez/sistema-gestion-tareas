import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { MainTitleComponent } from 'src/app/shared/components/page-title/main-title.component';
import { FeaturesModule } from '../features.module';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  }
];

@NgModule({
  declarations: [
    TasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeaturesModule,
  ]
})
export class TasksModule { }

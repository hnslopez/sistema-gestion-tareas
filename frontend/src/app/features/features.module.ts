import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/main/home.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TranslateModule } from '@ngx-translate/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ImgCardComponent } from 'src/app/shared/components/img-card/img-card.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { MainTitleComponent } from 'src/app/shared/components/page-title/main-title.component';
import { ExpressComponent } from './home/express/express.component';
import { MongodbComponent } from './home/mongodb/mongodb.component';
import { AngularComponent } from './home/angular/angular.component';
import { RouterModule } from '@angular/router'; 
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { LoginComponent } from './auth/login/login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginFormComponent } from '../shared/components/exclusive/login-form/login-form.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';



@NgModule({
  declarations: [
    HomeComponent,
    ImgCardComponent,
    MainTitleComponent,
    AngularComponent,
    ExpressComponent,
    MongodbComponent,
    LoginComponent,
    CardComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    NzListModule,
    NzDividerModule,
    NzCardModule,
    NzSpaceModule,
    TranslateModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    RouterModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCollapseModule
    

  ]
})
export class FeaturesModule { }

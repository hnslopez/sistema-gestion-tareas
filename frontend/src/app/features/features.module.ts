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
import { CardComponent } from 'src/app/shared/components/img-card/card.component';
import { MainTitleComponent } from 'src/app/shared/components/page-title/main-title.component';
import { ExpressComponent } from './home/express/express.component';
import { MongodbComponent } from './home/mongodb/mongodb.component';
import { AngularComponent } from './home/angular/angular.component';
import { RouterModule } from '@angular/router'; 
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';



@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    MainTitleComponent,
    AngularComponent,
    ExpressComponent,
    MongodbComponent
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
    NzPageHeaderModule

  ]
})
export class FeaturesModule { }

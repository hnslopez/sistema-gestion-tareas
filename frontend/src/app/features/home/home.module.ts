import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
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



@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    MainTitleComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzGridModule,
    NzListModule,
    NzDividerModule,
    NzCardModule,
    NzSpaceModule,
    TranslateModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    
  ]
})
export class HomeModule { }

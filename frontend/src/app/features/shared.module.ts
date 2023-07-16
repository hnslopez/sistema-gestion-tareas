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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginFormComponent } from '../shared/components/exclusive/login-form/login-form.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { SectionComponent } from '../shared/components/section/section.component';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

import { TreeViewComponent } from '../shared/components/tree-view/tree-view.component';
import { MarkdownComponent } from '../shared/components/markdown/markdown.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TableComponent } from '../shared/components/table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { EmptyComponent } from '../shared/components/empty/empty.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { DragAndDropComponent } from '../shared/components/drag-and-drop/drag-and-drop.component';
import { InputComponent } from '../shared/components/input/input.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { IconsProviderModule } from '../icon-provider.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { RibbonComponent } from '../shared/components/ribbon/ribbon.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SelectComponent } from '../shared/components/select/select.component';
import { NzTagModule } from 'ng-zorro-antd/tag';



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
    LoginFormComponent,
    SectionComponent,
    TreeViewComponent,
    MarkdownComponent,
    TableComponent,
    EmptyComponent,
    DrawerComponent,
    DragAndDropComponent,
    InputComponent,
    SearchPipe,
    RibbonComponent,
    SelectComponent
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
    NzCollapseModule,
    NzTreeViewModule,
    NzEmptyModule,
    NzSpinModule,
    NzTabsModule,
    NzTableModule,
    NzSelectModule,
    NzDrawerModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzDividerModule,
    NzSelectModule,
    NzSwitchModule,
    IconsProviderModule,
    NzBadgeModule,
    NzAnchorModule,
    NzSegmentedModule,
    NzToolTipModule,
    NzPopoverModule,
    NzNotificationModule,
    FormsModule,
    NzOverlayModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzTagModule
  ],
  exports: [
    MainTitleComponent,
    EmptyComponent,
    SectionComponent,
    CardComponent,
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
    NzCollapseModule,
    NzTreeViewModule,
    NzEmptyModule,
    NzSpinModule,
    NzTabsModule,
    NzTableModule,
    NzDrawerModule,
    DrawerComponent,
    NzUploadModule,
    DragAndDropComponent,
    InputComponent,
    NzSelectModule,
    NzUploadModule,
    NzAutocompleteModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    NzDividerModule,
    NzSwitchModule,
    IconsProviderModule,
    NzBadgeModule,
    NzAnchorModule,
    NzSegmentedModule,
    NzToolTipModule,
    NzPopoverModule,
    NzNotificationModule,
    FormsModule,
    NzOverlayModule,
    SearchPipe,
    RibbonComponent,
    NzTimePickerModule,
    NzDatePickerModule,
    SelectComponent,
    NzTagModule
  ]
})
export class SharedModule { }

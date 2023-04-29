import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';
import { angularStructureData } from 'src/app/shared/data';
import { treeNode } from 'src/app/shared/interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {

  Data:treeNode[] =  angularStructureData;
  snippet:any;
  selectedValue!: 'es' | 'en';
  selectedTab:number = 0;

  modules = [
    {
      name: 'auth0.name',
      description: 'auth0.description'
    },
    {
      name: 'fontawesome.name',
      description: 'fontawesome.description'
    },
    {
      name: 'ngrx/effects.name',
      description: 'ngrx/effects.description'
    },
    {
      name: 'ngrx/router-store.name',
      description: 'ngrx/router-store.description'
    },
    {
      name: 'ngrx/store-devtools.name',
      description: 'ngrx/store-devtools.description'
    },
    {
      name: 'ngrx/store.name',
      description: 'ngrx/store.description'
    },
    {
      name: 'ngx-translate/core.name',
      description: 'ngx-translate/core.description'
    },
    {
      name: 'ngx-translate/http-loader.name',
      description: 'ngx-translate/http-loader.description'
    },
    {
      name: 'bootstrap.name',
      description: 'bootstrap.description'
    },
    {
      name: 'bootstrap-icons.name',
      description: 'bootstrap-icons.description'
    },
    {
      name: 'ng-zorro.name',
      description: 'ng-zorro.description'
    }
  ];


  changeSnippet(value:any){
    this.snippet = value;
  }

  async languageChange() {
    const languageValue =  localStorage.getItem('locale') as 'es' | 'en';
    if(languageValue === 'es') this.selectedTab = 1;
    if(languageValue === 'en') this.selectedTab = 0;

    this.selectedValue = languageValue || 'es';

    await this.app.switchLanguage(this.selectedValue === 'es'? 'en':'es');

    const notificactionTitle = this.translateService.instant('components.notification.changeLanguage.title');
    const notificactionDescription = this.translateService.instant('components.notification.changeLanguage.description');

    await this.notification.create(
      'success',
      notificactionTitle,
      notificactionDescription
    );
  }

  constructor(private app: AppComponent, private notification: NzNotificationService, private translateService: TranslateService) {
   }

  ngOnInit(): void {
  }

}

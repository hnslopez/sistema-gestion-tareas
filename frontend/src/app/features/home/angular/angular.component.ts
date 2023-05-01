import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from 'src/app/app.component';
import { angularStructureData } from 'src/app/shared/data';
import { Library, treeNode } from 'src/app/shared/types';
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

  modules: Library[] = [];



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
    // Suscripción al cambio de idioma
    this.translateService.onLangChange.subscribe(() => {
      this.translateService
        .get('angular.section.libraries.components')
        .subscribe((translations: Library[]) => {
          console.log(translations);
          this.modules = translations;
        });
    });
  
        // Obtener las traducciones iniciales
  
      this.translateService
        .get('angular.section.libraries.components')
        .subscribe((translations: Library[] ) => {
          console.log(translations)
         this.modules = translations;
        });
    }
    

}

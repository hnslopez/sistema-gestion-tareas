import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from './theme.service';
import { Observable } from 'rxjs';
import { NzConfigService, Theme } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'frontend';
  theme$!: Observable<string>;
  isDarkTheme = 'light';
  isCollapsed = false;

  constructor(public translate: TranslateService, private themeService: ThemeService) {
  } 

  public switchLanguage(language: 'es' | 'en'): void {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }




  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }

}

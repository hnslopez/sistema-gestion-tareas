import { Component, HostListener, Renderer2 } from '@angular/core';
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
  isMobile = true;

  constructor(public translate: TranslateService) {
    let defaultLenguage = localStorage.getItem('locale') || 'es-CL';

    if (!['es-CL', 'en-US'].includes(defaultLenguage)) {
      defaultLenguage = 'es-CL';
      localStorage.setItem('locale', defaultLenguage);
    }

    translate.setDefaultLang(defaultLenguage || 'es-CL');
  }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  public switchLanguage(language: 'es' | 'en'): void {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  onToggleSidebar(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }





}

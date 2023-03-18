import { Component, HostListener, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'frontend';
  theme$!: Observable<string>;
  isDarkTheme = 'light';
  isCollapsed = true;
  isMobile = true;

  constructor(public translate: TranslateService) {
    let defaultLenguage = localStorage.getItem('locale') || 'es';

    if (!['es', 'en'].includes(defaultLenguage)) {
      defaultLenguage = 'es';
      localStorage.setItem('locale', defaultLenguage);
    }

    translate.setDefaultLang(defaultLenguage || 'es');
  }

  onIsCollapsedChanged(value: boolean) {
    this.isCollapsed = value;
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

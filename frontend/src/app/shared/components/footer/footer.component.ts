import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year!: number;
  linkedin: any;
  github: any;
  
  readonly language = [
    {value:"es",name:'Español'},
    {value:"en", name:'English'}
  ];
  selectedValue!: 'es-CL' | 'en-US';

  //trackBy 
  trackByValue(index: number, language:any):string{
      return language.value;
  }


  languageChange(params:any) {
    this.app.switchLanguage(params);
  }

  constructor(private sanitizer:DomSanitizer, private app: AppComponent) { 
    this.linkedin = sanitizer.bypassSecurityTrustUrl('https://www.linkedin.com/in/hnslopez/');
    this.github = sanitizer.bypassSecurityTrustUrl('https://github.com/hnslopez');
  }

  ngOnInit(): void {
    const languageValue =  localStorage.getItem('locale') as 'es-CL';
    this.selectedValue = languageValue || 'es-CL';
    this.year = new Date().getFullYear();
  }

}

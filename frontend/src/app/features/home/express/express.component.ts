import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { expressStructureData, generateJWT, loginCode, routes, validationPassportJWT, validationPassportLocal } from 'src/app/shared/data';
import { Library, Route, treeNode } from 'src/app/shared/types';

@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.css']
})
export class ExpressComponent implements OnInit {

  routesBackend:Route[] = routes;
  Data:treeNode[] =  expressStructureData;
  snippet:any;
  modules: Library[] = [];

  showCode = '';


  constructor(private translateService: TranslateService) {
  }

  changeCode(value:number):void{
    switch (value) {
      case 1:
          this.showCode = generateJWT;
        break;
        case 2:
          this.showCode = validationPassportJWT;
        break;
        case 3:
          this.showCode = validationPassportLocal;
        break;
        case 4:
          this.showCode = loginCode;
        break;
        default:
        this.showCode = generateJWT;
        break;
    }

  }

  ngOnInit(): void {
  // Suscripción al cambio de idioma
  this.translateService.onLangChange.subscribe(() => {
    this.translateService
      .get('express.section.libraries.components')
      .subscribe((translations: Library[]) => {
        this.modules = translations;
      });
  });

      // Obtener las traducciones iniciales

    this.translateService
      .get('express.section.libraries.components')
      .subscribe((translations: Library[] ) => {
        console.log(translations)
       this.modules = translations;
      });
  }

  changeSnippet(value:any){
    this.snippet = value;
  }


}

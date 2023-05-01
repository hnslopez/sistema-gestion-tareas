import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { expressStructureData, routes } from 'src/app/shared/data';
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


  constructor(private translateService: TranslateService) {
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

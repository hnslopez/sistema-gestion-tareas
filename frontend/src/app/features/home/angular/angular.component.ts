import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {

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


  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from 'src/app/shared/components/drawer/drawer.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(DrawerComponent) drawerComponent!: DrawerComponent;
  teamMembers: any[] = []; // Lista de miembros del equipo disponibles
  availableTags: string[] = []; // Lista de etiquetas disponibles

  open(): void {
    this.drawerComponent.open();
  }

  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  submitForm(): void {

  }




  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      projectDescription: [null, [Validators.required]],
      rangePicker: [[]],

    });
  }
}

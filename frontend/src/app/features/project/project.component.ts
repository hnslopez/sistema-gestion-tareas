import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from 'src/app/shared/components/drawer/drawer.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { StatusProjectType } from 'src/app/shared/enum/statusProject.enum';
import { DragAndDropComponent } from 'src/app/shared/components/drag-and-drop/drag-and-drop.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(DrawerComponent) drawerComponent!: DrawerComponent;
  @ViewChild(DragAndDropComponent) DragComponent!: DragAndDropComponent;

  teamMembers: any[] = []; // Lista de miembros del equipo disponibles
  availableTags: string[] = []; // Lista de etiquetas disponibles
  startValue: Date | null = null;
  endValue: Date | null = null;

  open(): void {
    this.drawerComponent.open();
  }

  validateForm!: FormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };


  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      projectDescription: [null, [Validators.required, Validators.minLength(10) , Validators.maxLength(500)]],
      rangePickerStart: [null, [Validators.required]],
      rangePickerEnd: [null, [Validators.required]],
      projectManager: [null, [Validators.required]],
      projectMembers: [null],
      projectTag: [null, [Validators.required]],
      projectStatus: [null, [Validators.required]]
    });
  }
}

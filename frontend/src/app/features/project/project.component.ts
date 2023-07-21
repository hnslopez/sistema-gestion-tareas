import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from 'src/app/shared/components/drawer/drawer.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DragAndDropComponent } from 'src/app/shared/components/drag-and-drop/drag-and-drop.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { projects_examples } from 'src/app/shared/data/examples/proyects.example';
import { NzProgressStatusType } from 'ng-zorro-antd/progress';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectOption } from 'src/app/shared/types/app-select.type';
import { ProjectStatus } from 'src/app/shared/enum/status-type.enum';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']})
export class ProjectComponent implements OnInit {
  @ViewChild(DrawerComponent) drawerComponent!: DrawerComponent;
  @ViewChild(DragAndDropComponent) DragComponent!: DragAndDropComponent;

  teamMembers: any[] = []; // Lista de miembros del equipo disponibles
  availableTags: string[] = []; // Lista de etiquetas disponibles
  startValue: Date | null = null;
  endValue: Date | null = null;
  isLoading = false;
  validateForm!: FormGroup;
  loadingSkeleton:boolean = true;
  isEmpty = false;
  data:any;
  dataFull:any;
  searchText:string ='';
  searchStatus:string = '';
  projectStatusOptions: SelectOption[] = [
    { value: ProjectStatus.Completed, label: 'Completado' },
    { value: ProjectStatus.InProgress, label: 'En Progreso' },
    { value: ProjectStatus.Pending, label: 'Pendiente' },
    { value: ProjectStatus.OnHold, label: 'En Espera' },
    { value: ProjectStatus.Cancelled, label: 'Cancelado' },
    { value: ProjectStatus.Delayed, label: 'Retrasado' },
    { value: ProjectStatus.Archived, label: 'Archivado' },
    { value: ProjectStatus.Paused, label: 'Pausado' },
  ];
  
  totalItems:number = 0;
  pageSize:number = 8;
  pageIndex:number = 1;

  open(): void {
    this.drawerComponent.open();
  }

  close(): void {
    this.drawerComponent.close();
  }

  async submitForm(): Promise<void>{

    if (this.validateForm.valid) {
      this.isLoading = true;
      console.log('submit', this.validateForm.value);
  
      this.startShowMessages()
      
      await this.sleep(5000); // Esperar 5 segundos

      await this.message.remove()

      this.successShowMessages();
      
      this.validateForm.reset(); 

      for (const key in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(key)) {
          this.validateForm.controls[key].markAsPristine();
          this.validateForm.controls[key].markAsUntouched();
          this.validateForm.controls[key].updateValueAndValidity();
        }
      }

      //Subir alrchivos
      await this.DragComponent.submitUpload('a','id');

      this.isLoading = false;
      this.close();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
    
  startShowMessages(): void {
    const notificactionWaiting = this.translateService.instant('components.notification.dataLoadingForm.start_project');
    this.message.loading(notificactionWaiting, { nzDuration: 0 })
  }
  
  successShowMessages(): void {
    const notificactionWaiting = this.translateService.instant('components.notification.dataLoadingForm.submitSuccess');
    this.message.success(notificactionWaiting, { nzDuration: 2500 })
  }

  errorShowMessages(): void {
    const notificactionWaiting = this.translateService.instant('components.notification.dataLoadingForm.submitError');
    this.message.error(notificactionWaiting, { nzDuration: 2500 })
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

  constructor(private fb: FormBuilder, private message: NzMessageService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.loadDataFromUrl();

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
  getColorByStatus(status: string): string {
    switch (status) {
      case 'in_progress':
        return 'blue';
      case 'completed':
        return 'success';
      case 'pending':
        return 'default';
      case 'on_hold':
        return 'gold';
      case 'cancelled':
        return 'error';
      case 'delayed':
        return 'warning';
      case 'archived':
        return 'purple';
      case 'open':
        return 'green';
      case 'paused':
        return 'cyan';
      case 'under_review':
        return 'processing';
      // Agrega más casos según tus necesidades
      default:
        return 'default';
    }
  }

  getColorByPriority(priority: string): string{
    switch (priority) {
      case 'medium':
        return 'blue';
      case 'high':
        return 'error';
      default:
        return 'green';
    }
  }

  getStatusProgress(status: string): NzProgressStatusType{
    switch (status) {
      case 'cancelled':
        return 'exception';
      case 'hold':
        return 'normal'
      case 'completed':
        return 'success'
      case 'under_review':
        return 'exception'
        case 'paused':
          return 'exception'
      default:
        return 'active';
  }
}
  
onPageIndexChange(newPageIndex: number) {
  this.pageIndex = newPageIndex;
  this.loadDataFromUrl();
}

  async loadDataFromUrl(){
    //await this.sleep(1000)
    if(projects_examples.length == 0) this.isEmpty = true;
    this.loadingSkeleton = false;
    this.data = projects_examples
    this.totalItems = projects_examples.length;
    // Devolver 'this.data' para asignar los datos mapeados a la variable 'data'
    this.dataFull = this.data;
    return this.data;

    /**
     * TODO: GENERAR LOGICA TRAER INFO DEL PROYECTO
     */
  }
}

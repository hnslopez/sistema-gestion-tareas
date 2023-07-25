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
import { ActivatedRoute } from '@angular/router';

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
  searchStatus:string[] = [];
  projectStatusOptions: SelectOption[] = [
    { value: ProjectStatus.Completed, label: this.translateService.instant('project.project_details.'+ProjectStatus.Completed) },
    { value: ProjectStatus.InProgress, label: this.translateService.instant('project.project_details.'+ProjectStatus.InProgress)  },
    { value: ProjectStatus.Pending, label: this.translateService.instant('project.project_details.'+ProjectStatus.Pending)  },
    { value: ProjectStatus.OnHold, label: this.translateService.instant('project.project_details.'+ProjectStatus.OnHold)  },
    { value: ProjectStatus.Cancelled, label: this.translateService.instant('project.project_details.'+ProjectStatus.Cancelled)  },
    { value: ProjectStatus.Delayed, label: this.translateService.instant('project.project_details.'+ProjectStatus.Delayed)  },
    { value: ProjectStatus.Archived, label: this.translateService.instant('project.project_details.'+ProjectStatus.Archived)  },
    { value: ProjectStatus.Paused, label: this.translateService.instant('project.project_details.'+ProjectStatus.Paused)  },
  ];
  filterPage:string = '';
  
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

  constructor(private fb: FormBuilder, private message: NzMessageService, private translateService: TranslateService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadDataFromUrl();
    let filter = this.route.snapshot.data['filter']

    if(filter){
      this.searchStatus = filter;
      this.filterPage = filter;
    }

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

  ngAfterViewInit() {
    this.route.url.subscribe(urlSegments => {
      // Verificar si la ruta actual es '/create'
      const currentUrl = '/' + urlSegments.join('/');
      if (currentUrl === '/create') {
        // Ejecutar el código después de que todos los componentes estén cargados
        this.drawerComponent.open();
      }
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
    //await this.sleep(3000)
    if(projects_examples.length == 0) this.isEmpty = true;
    this.loadingSkeleton = false;
    this.data = projects_examples
    this.totalItems = projects_examples.length;

    this.dataFull = this.data;
    return this.data;

    /**
     * TODO: GENERAR LOGICA TRAER DESDE EL BACKEND
     */
  }
}

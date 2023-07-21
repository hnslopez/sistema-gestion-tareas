import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiService } from 'src/app/core/services';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  uploading = false;
  fileList: NzUploadFile[] = [];

  uploadDisabled = true;


  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * Sube los archivos al servidor.
   * @param url La URL donde se enviarán los archivos.
   * @param id El identificador del proyecto al que se relacionan los archivos.
   */
  async submitUpload(url: string, id: string): Promise<void> {
    console.log(this.fileList);
    this.startShowMessages();

    // Lógica para enviar los archivos al servidor
    // Utiliza el servicio ApiService para realizar la petición POST a la URL especificada

    //await this.message.remove();

    // Carga de archivos completada
    //this.successtShowMessages();
  }

  /**
   * Muestra un mensaje de carga de archivos iniciada.
   */
  startShowMessages(): void {
    const notificationWaiting = this.translateService.instant('components.notification.fileUpload.start');
    this.message.loading(notificationWaiting, { nzDuration: 2500 });
  }

  /**
   * Muestra un mensaje de carga de archivos exitosa.
   */
  successtShowMessages(): void {
    const notificationSuccess = this.translateService.instant('components.notification.fileUpload.success');
    this.message.success(notificationSuccess, { nzDuration: 2500 });
  }

  /**
   * Muestra un mensaje de error en la carga de archivos.
   */
  errorShowMessages(): void {
    const notificationError = this.translateService.instant('components.notification.fileUpload.error');
    this.message.error(notificationError, { nzDuration: 2500 });
  }
  constructor(private api: ApiService, private message: NzMessageService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

}

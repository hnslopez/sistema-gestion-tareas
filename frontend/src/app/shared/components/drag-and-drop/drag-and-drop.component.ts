import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

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


  submitUpload(url:string){
    console.log(this.fileList)
  }

  constructor() { }

  ngOnInit(): void {
  }

}

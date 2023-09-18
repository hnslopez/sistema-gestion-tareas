import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
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

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      // Send the formData to your API or perform any other required action
      console.log(formData);
    } else {
      // Form is invalid, handle error or show validation messages
    }
  }
}
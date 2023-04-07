import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading$ = null;
  showLoginError$ = null;
  passwordVisible = false;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
      password: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const {password, userName} = this.validateForm.value;
      //this.authFacade.login(userName, password)

    }
  }

  onSubmit() {
    console.log(this.validateForm.value);
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/shared/models/login';
import { AuthService } from 'src/shared/services/auth.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  loginModel!: Login;
  show = false;
  password!: any;
  showPassword = false;
  showConfirmPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private contentService: ContentService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm(); 
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });
  }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  
  resetPassword(){
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let payload = {
      email: this.form.value.email,
      newPassword: this.form.value.newPassword
    }
    this.contentService.resetPasswords(payload).subscribe(response => {
      if (response.status == true) {
        debugger
        this.router.navigate(['/login'])
          .then(() => {
            window.location.reload();
          });
        this.toasterService.success(response.message);
      }
      else {
        this.toasterService.error(response.message);
      }
    });
  }
  get f() {
    return this.form.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}


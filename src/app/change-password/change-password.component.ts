import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  show = false;
  password!: any;
  showPassword = false;
  showPassword1 = false;
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
      oldPassword: ['', [Validators.required]],
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
  
  changePassword(){
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    let payload = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword
    }
    this.contentService.changedPassword(payload).subscribe(response => {
      if (response.status == true) {
        debugger
        this.router.navigate(['/bookings'])
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

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}


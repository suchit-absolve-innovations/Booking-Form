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
  disableInput: boolean = false;
  showPassword = false;
  otpVerified = false;
  showConfirmPassword = false;
  receivedOTP: any;
  verifiedEmail: any;
  otpSent = false; // Flag to track if OTP has been sent
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
      confirmPassword: ['', [Validators.required]],
      otp: ['', Validators.required],
    //  isVerify: [false]
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
  emailVerify() {
    debugger
    this.submitted = true;
   
    if (this.form.controls['email'].invalid) {
      this.toasterService.error('Please enter a valid email.');
      return;
    }
    this.spinner.show();
    const payload = {  
      email: this.form.value.email, // Assuming email is within personalProfile
      isVerify: this.form.value.isVerify,
    };
  
    this.contentService.emailVerify(payload).subscribe(response => {
      if (response.status == true) {
        this.receivedOTP = response.data.otp;
        // this.verifiedEmail = this.form.value.email;
        this.form.controls['otp'].enable();
        this.toasterService.success(response.message);
        this.otpSent = true; 
      } else {
        this.toasterService.error(response.message);
      }
      this.spinner.hide();
      this.submitted = false;
    });
  }

  
  verifyOTP() {
    if (!this.otpSent) {
      this.toasterService.error('Please send OTP first.');
      return;
    }

    const enteredOTP = this.form.value.otp;
    if (enteredOTP === this.receivedOTP.toString()) {
      this.otpVerified = true;
      this.form.controls['otp'].disable();
      this.toasterService.success('OTP verified successfully.');
    } else {
      this.toasterService.error('Invalid OTP. Please try again.');
    }
  }
  
  resetPassword(){
    debugger
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if(this.otpVerified ==false){
      this.toasterService.error('Please verify OTP first')
      return;
    }

    this.spinner.show();
      let payload = {
        email: this.form.value.email,
        newPassword: this.form.value.newPassword
      }
      this.contentService.resetPasswords(payload).subscribe(response => {
        if (response.status == true) {
          this.toasterService.success(response.message);
          this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            });
         
        }
        else {
          this.toasterService.error(response.message);
        }
      });
    }

 
  
  get f() {
    return this.form.controls;
  }
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 5 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}


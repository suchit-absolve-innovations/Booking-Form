import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/shared/models/login';
import { AuthService } from 'src/shared/services/auth.service';
import { ContentService } from '../content.service';
import { Router } from '@angular/router';
import { emailUniqueValidator } from '../email';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  bookingForm!: FormGroup;
  submitted: boolean = false;
  loginModel!: Login;
  show = false;
  password!: any;
  bookId!: any;
  phoneTouched: boolean = false;
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
    this.registerForm();
  }

  registerForm() {
    this.bookingForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      customerFname: ['', [Validators.required]],
      customerLname: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern("^[A-Za-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")],
        [emailUniqueValidator(this.contentService)],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^04\\d{8}$')]],
    })

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
  onphoneBlur() {
    this.phoneTouched = true;
  }
  onKeyDown1(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 10 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  registeredForm() {
    this.submitted = true;
    // if (this.bookingForm.invalid) {
    //   console.log('Form has validation errors.');
    //   return;
    // }
  
    const payload = {
      customerId: "", // Ensure this is always a number, use 0 for new registrations
      customerFname: this.bookingForm.value.customerFname,
      customerLname: this.bookingForm.value.customerLname,
      email: this.bookingForm.value.email,
      mobile: this.bookingForm.value.mobile,
      password: this.bookingForm.value.password
    };
  
    this.contentService.registerAccount(payload).subscribe((response) => {
      if (response.status) {
        this.toasterService.success(response.message);
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      } else {
        this.toasterService.error(response.message);
      }
    });
  }
  
  
  

  get f() {
    return this.bookingForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
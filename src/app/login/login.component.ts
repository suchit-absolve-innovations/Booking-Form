import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Login } from 'src/shared/models/login';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loginModel!: Login;
  
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm(); 
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  onLogin() {
    debugger
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    this.spinner.show();
    this.loginModel = this.form.value;
    this.auth.login(this.loginModel).subscribe((response) => {
      if (response.isSuccess) {
          this.spinner.hide();
          this.router.navigateByUrl('/');
        } 
       else {
        this.spinner.hide();
      }
    });
  }

}

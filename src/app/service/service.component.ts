import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  submitted: boolean | any = false; // Initialized to false
  discountForm!: FormGroup;
  isMenuOpen = false;
  checkList!: any
  checkdata: any;
  exclusions: any;
  faq: { faqQuestion: string, faqAnswer: string }[] = [];
  expandedIndex = 0; // Set the first item as expanded initially
  data!: string | null;
  name!: any;
  name1!: string | null;
  constructor(private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
    private formBuilder: FormBuilder,) {
      
     }

  ngOnInit(): void {
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
this.data = localStorage.getItem('token');
    this.coupanForm();
    this.getInclusion();
    this.getExclusion();
    this.getFaq();
  }
  toggle(index: number) {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  ///coupan///

  coupanForm() {
    this.discountForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }


  logouts() {
    localStorage.clear();
    this.auth.logout();
  }

  
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
  discount() {
    debugger
    this.submitted = true
    if (this.discountForm.invalid) {
      return;
    }
    let payload = {
      email: this.discountForm.value.email,

    };

    this.contentService.discountCoupan(payload).subscribe((response) => {
      if (response.status == true) {
        this.toasterService.success(response.message);
      } else {
        this.toasterService.error(response.message);
      }
    });
  }


  getInclusion(){
debugger
    this.contentService.getCheckList().subscribe(response => {
      if(response.status == true){
this.checkList = response.data;

      } else {

      }
    });
  }

  getExclusion(){
    this.contentService.getExclusionList().subscribe(response => {
      if(response.status ==true){
this.exclusions = response.data
      } else {

      }
    })
  }


  getFaq(){
    debugger
    this.contentService.getFaqList().subscribe(response => {
      if(response.status == true) {
        this.faq = response.data
      } else {
        
      }
    })
  }


  home() {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/home']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/home']); // Redirect to login if token is missing
    }
  }
  

  service(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/service']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/service']); // Redirect to login if token is missing
    }
  }


  term(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/terms-&-condition']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/terms-&-condition']); // Redirect to login if token is missing
    }
  }


  privacy(){
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/privacy-policy']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/privacy-policy']); // Redirect to login if token is missing
    }
  }

  book(){
    debugger
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists

     this.router.navigate(['/book-form']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/booking-form']); // Redirect to login if token is missing
    }
  }
}

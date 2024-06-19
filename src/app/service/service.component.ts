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
  constructor(private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
    private formBuilder: FormBuilder,) {
      
     }

  ngOnInit(): void {

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
}

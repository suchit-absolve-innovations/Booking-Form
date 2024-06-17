import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cleaningStatus: any;
  submitted: boolean | any = false; // Initialized to false
  discountForm!: FormGroup;
  isMenuOpen = false;
  constructor(  private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
    private formBuilder: FormBuilder,) { }

    ngAfterViewInit() {
      $('.slider-home').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });

      $('.portfolio').owlCarousel({
        items:2.7,
        margin:30,
        loop:true,
        nav:true,
        navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        dots:false,
        autoHeight: false,
        autoplay: false,
        responsive:{
          0:{
            items:2.2,
            margin:15
          },
    
          767:{
            items:2.5,
            margin:15
          },
    
          991:{
            items:3.5,
            margin:15
          },
    
          1366:{
            items:2.7
          }
        }		
      });


      $('.testimonial').owlCarousel({
        items: 2,
        margin: 80,
        loop: true,
        nav: false,
        navText : ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        dots: true,
        autoHeight: false,
        autoplay: false,
        responsive:{
          0:{
            items:1
          },
    
          767:{
            items:1
          },
    
          991:{
            items:2
          },
    
          1366:{
            items:2
          }
        }		
      });
    }




   
  
  ngOnInit(): void {
    this.getHomeValue();
    this.coupanForm();
  }


  closeMenu(): void {
    this.isMenuOpen = false;
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ///coupan///

  coupanForm() {
    this.discountForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  getHomeValue(){
    this.contentService.getHome().subscribe(response => {
      if(response.status == true) {
     this.cleaningStatus = response.data;
      } else {

      }
    });
  }


  disount() {
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
}

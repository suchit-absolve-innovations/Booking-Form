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

  review: any[] = [];
  currentSlide = 0;
  data!: string | null;
  name!: any;
  name1!: string | null;
  constructor(  private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
    private formBuilder: FormBuilder,) { }

 




   
  
  ngOnInit(): void {
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
    this.data = localStorage.getItem('token');
    this.getHomeValue();
    this.coupanForm();
    this.getGoogleReview();
  }

  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
  ngAfterViewInit() {

    $('#testimonial-carousel').owlCarousel({
      items: 2, // Display two items per slide
      margin: 30, // Margin between items
      loop: true, // Enable loop mode
      nav: false, // Disable navigation arrows
      dots: true, // Enable pagination dots
      autoHeight: false, // Disable auto-height adjustment
      responsive: {
        0: {
          items: 1 // Display one item on smaller screens
        },
        768: {
          items: 2 // Display two items on larger screens
        }
      }
    });
  

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


   
    

  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % Math.ceil(this.review.length / 2);
  }

  prevSlide() {
    // this.currentSlide = (this.currentSlide - 1 + Math.ceil(this.review.length / 2)) % Math.ceil(this.review.length / 2);

 
      const totalSlides = Math.ceil(this.review.length / 2);
      this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
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
  setScrollPosition1(): void {
    this.router.navigate(['/service']).then(() => {
      const scrollPosition = 5550;  
      window.scrollTo({ top: scrollPosition, behavior: 'auto' });
    });
  }


  getGoogleReview(){
    this.contentService.getReviewsList().subscribe(response => {
      if(response.status == true){
this.review = response.data
      }
    });
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

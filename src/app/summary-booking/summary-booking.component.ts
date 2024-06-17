import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContentService } from '../content.service';
import { DatePipe, formatDate } from '@angular/common';
import { emailUniqueValidator } from '../email';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AccessMethods } from 'src/shared/types';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-summary-booking',
  templateUrl: './summary-booking.component.html',
  styleUrls: ['./summary-booking.component.css']
})
export class SummaryBookingComponent implements OnInit {
  order: any;
  bookId!: string | null;
  isMenuOpen = false;
  name!: any;
  name1!: string | null;
  token!: string | null;
  constructor(   private content: ContentService,
    private router : Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService) { }
bookingId :any
  ngOnInit(): void {
    this.getOrder();
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
  }

  getOrder(){
     this.spinner.show();
    this.bookId = localStorage.getItem('bookId');
    this.content.getOrderConfirmation(this.bookId).subscribe(response => {
      if(response.status == true) 
        {
          this.spinner.hide();
this.order = response.data
        } else {
this.spinner.hide();
        }
    });
  }


  route(){
   
  this.router.navigateByUrl('/bookings');
  
  }
  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }
  send(){
    this.token = localStorage.getItem('token')

    if(this.token ==this.token) {
      this.router.navigate(['/book-form']).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/booking-form']).then(() => {
        window.location.reload();
      });
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  home(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  service(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  book(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContentService } from '../content.service';
import { DatePipe, formatDate } from '@angular/common';
import { emailUniqueValidator } from '../email';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AccessMethods } from 'src/shared/types';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-summary-booking',
  templateUrl: './summary-booking.component.html',
  styleUrls: ['./summary-booking.component.css']
})
export class SummaryBookingComponent implements OnInit {
  order: any;
  bookId!: string | null;

  constructor(   private content: ContentService,
    private router : Router,
    private spinner: NgxSpinnerService) { }
bookingId :any
  ngOnInit(): void {
    this.getOrder();
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
    })
  }


  route(){
   window.location.href = "https://seeyourdemosite.com/blissful-homes/"
  }

}

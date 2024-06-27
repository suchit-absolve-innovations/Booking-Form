import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../content.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  summaryData: any;
  timingId: any;
  bookId: any;
  bookingId: any;
  minDate!: Date;
  bsConfig!: Partial<BsDatepickerConfig>;
  displayDate!: any;
  minToDate!: Date;
  bookingForm!: FormGroup;
  timingList: any;
  oftendata = {
    weeklyDiscount: 10,
    fortnightlyDiscount: 15
  };
  bookFreq: any;
  selectedValue: any;
  isMenuOpen = false;
  name!: any;
  name1!: string | null;
  token!: string | null;
  scheduleId: any;
  submitted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private service: ContentService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder,
  ) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id && params.id2) {
        this.bookId = params.id;
        this.scheduleId = params.id2;
        localStorage.setItem('bookId', this.bookId);
        localStorage.setItem('scheduleId', this.scheduleId);
        const data = { bookingId: this.bookId, scheduleId: this.scheduleId };
        this.getSummary(data);
      }
    });
    this.getTimingList();
    this.rescheduleForm();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 2);

    // Configure date picker
    this.bsConfig = {
      dateInputFormat: 'DD-MM-YYYY',
      minDate: this.minDate,
      showWeekNumbers: false
    };
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
  }

  rescheduleForm(): void {
    this.bookingForm = this.formBuilder.group({
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      regCleaningFreq: ['', Validators.required]
    });
  }
  setToDateMinDate(event: Date) {
    this.minToDate = event; // Set the minimum date for the "toDate" field
    
  }
  get f() {
    return this.bookingForm.controls;
  }
  getTime(data: any) {
    this.timingId = data
  }
  getTimingList() {
    this.service.getTimeList().subscribe((response) => {
      if (response.status == true) {
        this.timingList = response.data;
        this.timingId = this.timingList[0];
      }
    });
  }

  bookingFrequency(event: any) {
    this.selectedValue = event.target.value; // Get the selected value from the event
    this.bookingForm?.get('frequency')?.setValue(this.selectedValue); // Update the frequency form control value
}

  getSummary(data: any) {
    debugger
    this.spinner.show();
    this.service.confirmationSummary(data).subscribe(response => {
      if (response.status == true) {
        this.spinner.hide();
        this.summaryData = response.data;
      } else {
        this.spinner.hide();
      }
    });
  }
  cancelBookiing(bookingId: any, scheduleId: any) {
    debugger
    this.spinner.show();
    this.service.cancelBookings(bookingId, scheduleId).subscribe((response) => {
      if (response.status == true) {
        this.spinner.hide();
        this.toaster.success(response.message);
        this.router.navigate(['/bookings']).then(() => {
          window.location.reload();
        });
      } else {
        this.spinner.hide();
        this.toaster.error(response.message);
      }
    });
  }
  
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  rescheduleBooking() {
    this.submitted = true;
   
    const rawDate = this.minToDate;
    const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en');
    const payload = {
      bookingId: parseInt(this.bookId),
      bookingDate: formattedDate,
      bookingTime: this.timingId || '',
      // regCleaningFreq: this.selectedValue || 'O',
    };
    this.spinner.show();
    this.service.rescheduleBookings(payload).subscribe((response) => {
      if (response.status == true) {
        this.spinner.hide();
        this.toaster.success(response.message);
        this.router.navigate(['/bookings']).then(() => {
          window.location.reload();
        });
      } else {
        this.spinner.hide();
        this.toaster.error(response.message);
      }
    });
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

  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  home(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  service1(){
    localStorage.clear();
    this.router.navigate(['/service'])
  }

  book(){
    localStorage.clear();
    this.router.navigate(['/booking-form'])
  }
}


import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../content.service';
import { AuthService } from 'src/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  isMenuOpen = false;
  list: any[] = [];
  token!: string | null;
  name!: any;
  name1!: string | null;
  data!: string | null;
  constructor(
    private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.data = localStorage.getItem('token');
    this.get()
    this.bookingList();
    debugger
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
  }
     
  home() {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists
      this.router.navigate(['/home']);
    } else {
      // Token does not exist
      localStorage.clear();
      this.router.navigate(['/login']); // Redirect to login if token is missing
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


  
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  bookingList() {
    debugger
    // this.spinner.show();
    let payload = {
      pageNumber: 1,
      pageSize: 100
    };

    this.contentService.getBookingList(payload).subscribe(response => {
      if (response.status == true) {
        // this.spinner.hide();
        this.list = response.data.dataList;
        // console.log(this.list)
        // this.toasterService.success(response.message);
      } else {
        this.spinner.hide();
        this.toasterService.error(response.message);
      }
    });
  }
  truncateProductName(name: string, limit: number): string {
    if (name.length > limit) {
        return name.substring(0, limit) + '...';
    } else {
        return name;
    }
  }
  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
  openLink(url: string | null | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
  book(){
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

  send(){
    this.token = localStorage.getItem('token')

    if(this.token == this.token) {
      this.router.navigate(['/book-form']).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/booking-form']).then(() => {
        window.location.reload();
      });
    }
  }


  get(){
    this.token = localStorage.getItem('token');

    if (this.token) {
      // Token exists, navigate to booking-list
      this.router.navigate(['/bookings']).then(() => {
        if (!window.location.href.includes('/bookings')) {
          window.location.reload();
        }             
      });
    } else {
      // Token does not exist, navigate to login
      this.router.navigate(['/login']).then(() => {
        if (!window.location.href.includes('/login')) {
          window.location.reload();
        }
      });
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
  }


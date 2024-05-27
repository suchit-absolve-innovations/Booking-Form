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
  constructor(
    private toasterService: ToastrService, 
    private spinner: NgxSpinnerService, 
    private contentService: ContentService,
    private auth: AuthService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.bookingList();
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
        console.log(this.list)
        this.toasterService.success(response.message);
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
}

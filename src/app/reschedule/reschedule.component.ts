import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../content.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private route: ActivatedRoute,
    private service: ContentService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
    this.bookId = params.id
    localStorage.setItem('bookId',this.bookId);
     this.getSummary(params.id);
      }
  });
}

  getSummary(data:any){
    debugger
    this.service.confirmationSummary(data).subscribe(response => {
      if(response.status == true ) {
this.summaryData = response.data;
      } else {

      }
    });
  }
  deleteOrder(bookingId: any) {
    this.spinner.show()
    this.service.cancelBookings(bookingId).subscribe((response) => {
      if (response.status == true) {
        this.spinner.hide();
        // window.location.reload(); 
        this.toaster.success(response.message);
       this.router.navigateByUrl('/booking-form');
       this.router.navigate(['/booking-form']).then(() => {
        window.location.reload();
      })
    }
       else {
        this.spinner.hide();
        this.toaster.error(response.message);
      }
    });
  }

}

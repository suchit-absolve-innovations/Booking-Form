import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { ContentService } from '../content.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  summaryData: any;
  bookId: any;
  scheduleId: any;
  constructor(
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private service: ContentService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private router: Router,
  ) { }

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
 printPage() {
    debugger
    const printContents = document.getElementById('printSection')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();  // To restore the original state after printing
    }
  }
}

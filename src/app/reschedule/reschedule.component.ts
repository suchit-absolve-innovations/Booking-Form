import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../content.service';

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

  
}

import { Component, OnInit,ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, NgxStripeModule } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../content.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  timingId: any;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#000000' // Set placeholder color to black
        }
      },
      complete: {
        color: '#4caf50' // Example of additional styling
      },
      empty: {
        color: '#f44336'
      },
      invalid: {
        color: '#e53935'
      }
    }
  };
  

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  bookId: any;
  summaryData: any;
  tokenId!: string;
  constructor( private stripeService: StripeService,
    private route: ActivatedRoute,
    private service :ContentService,
    private spinner: NgxSpinnerService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    debugger
    this.route.params.subscribe((params: any) => {
      if (params.id) {
    this.bookId = params.id
     this.getSummary(params.id);
      }
    });
  }


   createToken(): void {
        
        const name = "Stripe create token test";
        this.stripeService
          .createToken(this.card.element, { name })
          .subscribe((result) => {
            if (result.token) {
              // Use the token
              this.tokenId = result.token.id
              console.log(result.token.id);
            this.authorize();
            } else if (result.error) {
              // Error creating the token
              console.log(result.error.message);
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


      authorize(){
        let payload ={
          bookingId: this.bookId,
          tokenId : this.tokenId
        }
        this.spinner.show();
        this.service.authorizePayment(payload).subscribe(response => {
          if(response.status == true ){
            debugger
            this.spinner.hide();
            if(response.data == '') {
              this.router.navigateByUrl('/booking-summary');
            } else {
              window.location.href = response.data.url;
            }
          
          
            console.log(response.data.url)
          } else {
            alert(response.message)
            this.spinner.hide();
          }
        })
      }
}

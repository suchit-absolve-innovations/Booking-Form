import { Component, HostListener, OnInit,Renderer2,ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent, NgxStripeModule } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../content.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/shared/services/auth.service';
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
  isMenuOpen = false;
  name!: any;
  name1!: string | null;
  token!: string | null;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  bookId: any;
  summaryData: any;
  tokenId!: string;
  scheduleId: any;
  constructor( private stripeService: StripeService,
    private route: ActivatedRoute,
    private service :ContentService,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2,
    private auth: AuthService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    debugger
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
    this.name = localStorage.getItem('fname')
    this.name1 = localStorage.getItem('lname')
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
  logouts() {
    localStorage.clear();
    this.auth.logout();
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
  openLink(url: string | null | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
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
        let payload = {
          bookingId:this.bookId,
          scheduleId : this.scheduleId,

        }
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
        });
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
        this.router.navigate(['/booking-form']);
      }
      @HostListener('window:scroll', [])
      onWindowScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 0) {
          this.renderer.addClass(header, 'sticky');
        } else {
          this.renderer.removeClass(header, 'sticky');
        }
      }
}

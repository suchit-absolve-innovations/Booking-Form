import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { OnlyNumberDirective } from 'src/numberonly.directive';
import { AlphabeticOnlyDirective } from 'src/alphabetic-only.directive';
import { NumberDirective } from 'src/number.directive';

import { NoLeadingSpacesDirective } from 'src/noLeadingSpaces.directive';
import { SummaryBookingComponent } from './summary-booking/summary-booking.component';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    OnlyNumberDirective,
    AlphabeticOnlyDirective,
    NumberDirective,
    NoLeadingSpacesDirective,
    BookingFormComponent,
    SummaryBookingComponent,
    LoginComponent,
    PaymentSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    NgxSpinnerModule,
    NgxStripeModule.forRoot(
      'pk_test_51P8a67L8TMFzydR9KPlqGBhCCwaBp1KR7A5LVbOWJSTAgFqVBkvngmOXUYWvHPKaePOWkTt0Pa2m4ux8GKmAZpTr00dlcEKQAg'
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

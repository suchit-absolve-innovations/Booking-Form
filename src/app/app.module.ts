import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BookingListComponent } from './booking-list/booking-list.component';
import { JwtInterceptor } from 'src/shared/helpers/jwt.interceptor';
import { LoginBookingComponent } from './login-booking/login-booking.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
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
    BookingListComponent,
    ForgotPasswordComponent,
    LoginBookingComponent,
    ChangePasswordComponent,
    RescheduleComponent
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
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    NgxStripeModule.forRoot(
      'pk_test_51P8a67L8TMFzydR9KPlqGBhCCwaBp1KR7A5LVbOWJSTAgFqVBkvngmOXUYWvHPKaePOWkTt0Pa2m4ux8GKmAZpTr00dlcEKQAg'
    //  ' pk_live_51P8a67L8TMFzydR937xJXJACJ8tz9HjJzC1CGsqvtPVCEM8Tq3WDbChJo2V9s7Ogp4bEHy6Bp7WkNNiaPXhI7bcE00ObIa4bS6'
    ),
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

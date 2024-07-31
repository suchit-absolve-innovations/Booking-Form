import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryBookingComponent } from './summary-booking/summary-booking.component';
import { AppComponent } from './app.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { environment } from 'src/environments/environment.prod';
import { LoginComponent } from './login/login.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { LoginBookingComponent } from './login-booking/login-booking.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { JoinComponent } from './join/join.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { EditPrivacyComponent } from './edit-privacy/edit-privacy.component';
import { EditTermConditionComponent } from './edit-term-condition/edit-term-condition.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'join', component: JoinComponent },
  { path: 'booking-form', component: BookingFormComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'booking-summary', component: SummaryBookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booking-form/summary/:id/:id2', component: PaymentSummaryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'book-form', component: LoginBookingComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'reschedule-booking/:id/:id2', component: RescheduleComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'invoice/:id/:id2', component: InvoiceComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-&-condition', component: TermsConditionComponent },
  // { path: 'service/edit', component: EditServiceComponent },
  // { path: 'terms-&-condition/edit', component: EditTermConditionComponent },
  // { path: 'privacy-policy/edit', component: EditPrivacyComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      !environment.production
        ? { enableTracing: false, scrollPositionRestoration: 'enabled' }
        : { scrollPositionRestoration: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

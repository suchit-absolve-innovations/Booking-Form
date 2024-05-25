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

const routes: Routes = [
  { path: '', redirectTo: '/booking-form', pathMatch: 'full' },
  { path: 'booking-form', component: BookingFormComponent },
  { path: 'booking-summary', component: SummaryBookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booking-form/summary/:id', component: PaymentSummaryComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'bookings', component: BookingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    !environment.production ? { enableTracing: false, useHash: true, scrollPositionRestoration: 'enabled' } : { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


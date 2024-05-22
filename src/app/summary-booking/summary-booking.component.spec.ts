import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryBookingComponent } from './summary-booking.component';

describe('SummaryBookingComponent', () => {
  let component: SummaryBookingComponent;
  let fixture: ComponentFixture<SummaryBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

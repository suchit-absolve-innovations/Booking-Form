import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermConditionComponent } from './edit-term-condition.component';

describe('EditTermConditionComponent', () => {
  let component: EditTermConditionComponent;
  let fixture: ComponentFixture<EditTermConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTermConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipprintComponent } from './payslipprint.component';

describe('PayslipprintComponent', () => {
  let component: PayslipprintComponent;
  let fixture: ComponentFixture<PayslipprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayslipprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

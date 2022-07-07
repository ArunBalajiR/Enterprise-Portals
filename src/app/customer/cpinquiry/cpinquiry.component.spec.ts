import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpinquiryComponent } from './cpinquiry.component';

describe('CpinquiryComponent', () => {
  let component: CpinquiryComponent;
  let fixture: ComponentFixture<CpinquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpinquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

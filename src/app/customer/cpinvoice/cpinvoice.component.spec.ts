import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpinvoiceComponent } from './cpinvoice.component';

describe('CpinvoiceComponent', () => {
  let component: CpinvoiceComponent;
  let fixture: ComponentFixture<CpinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

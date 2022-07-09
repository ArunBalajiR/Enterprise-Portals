import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpinvoicedownloadComponent } from './cpinvoicedownload.component';

describe('CpinvoicedownloadComponent', () => {
  let component: CpinvoicedownloadComponent;
  let fixture: ComponentFixture<CpinvoicedownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpinvoicedownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpinvoicedownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

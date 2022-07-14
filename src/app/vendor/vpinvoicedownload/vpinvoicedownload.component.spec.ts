import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpinvoicedownloadComponent } from './vpinvoicedownload.component';

describe('VpinvoicedownloadComponent', () => {
  let component: VpinvoicedownloadComponent;
  let fixture: ComponentFixture<VpinvoicedownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpinvoicedownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpinvoicedownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

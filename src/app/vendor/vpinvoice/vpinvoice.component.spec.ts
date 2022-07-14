import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpinvoiceComponent } from './vpinvoice.component';

describe('VpinvoiceComponent', () => {
  let component: VpinvoiceComponent;
  let fixture: ComponentFixture<VpinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

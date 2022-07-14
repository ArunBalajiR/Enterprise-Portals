import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpquotationComponent } from './vpquotation.component';

describe('VpquotationComponent', () => {
  let component: VpquotationComponent;
  let fixture: ComponentFixture<VpquotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpquotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpquotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

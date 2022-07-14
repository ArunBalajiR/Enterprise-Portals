import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpgoodsreceiptComponent } from './vpgoodsreceipt.component';

describe('VpgoodsreceiptComponent', () => {
  let component: VpgoodsreceiptComponent;
  let fixture: ComponentFixture<VpgoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpgoodsreceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpgoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

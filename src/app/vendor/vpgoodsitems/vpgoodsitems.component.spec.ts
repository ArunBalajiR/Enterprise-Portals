import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpgoodsitemsComponent } from './vpgoodsitems.component';

describe('VpgoodsitemsComponent', () => {
  let component: VpgoodsitemsComponent;
  let fixture: ComponentFixture<VpgoodsitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpgoodsitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpgoodsitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

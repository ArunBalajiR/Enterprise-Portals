import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VppoitemsComponent } from './vppoitems.component';

describe('VppoitemsComponent', () => {
  let component: VppoitemsComponent;
  let fixture: ComponentFixture<VppoitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VppoitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VppoitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

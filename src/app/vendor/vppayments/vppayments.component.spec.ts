import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VppaymentsComponent } from './vppayments.component';

describe('VppaymentsComponent', () => {
  let component: VppaymentsComponent;
  let fixture: ComponentFixture<VppaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VppaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VppaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

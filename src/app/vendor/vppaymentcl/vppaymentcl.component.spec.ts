import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VppaymentclComponent } from './vppaymentcl.component';

describe('VppaymentclComponent', () => {
  let component: VppaymentclComponent;
  let fixture: ComponentFixture<VppaymentclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VppaymentclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VppaymentclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

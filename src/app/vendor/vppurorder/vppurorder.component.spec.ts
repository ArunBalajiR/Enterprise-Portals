import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VppurorderComponent } from './vppurorder.component';

describe('VppurorderComponent', () => {
  let component: VppurorderComponent;
  let fixture: ComponentFixture<VppurorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VppurorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VppurorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

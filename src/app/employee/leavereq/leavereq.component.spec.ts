import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavereqComponent } from './leavereq.component';

describe('LeavereqComponent', () => {
  let component: LeavereqComponent;
  let fixture: ComponentFixture<LeavereqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavereqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavereqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

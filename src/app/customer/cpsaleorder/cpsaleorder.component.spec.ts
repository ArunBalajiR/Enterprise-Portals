import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpsaleorderComponent } from './cpsaleorder.component';

describe('CpsaleorderComponent', () => {
  let component: CpsaleorderComponent;
  let fixture: ComponentFixture<CpsaleorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpsaleorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpsaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

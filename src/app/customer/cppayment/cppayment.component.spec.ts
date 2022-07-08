import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CppaymentComponent } from './cppayment.component';

describe('CppaymentComponent', () => {
  let component: CppaymentComponent;
  let fixture: ComponentFixture<CppaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CppaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CppaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdebitComponent } from './cpdebit.component';

describe('CpdebitComponent', () => {
  let component: CpdebitComponent;
  let fixture: ComponentFixture<CpdebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

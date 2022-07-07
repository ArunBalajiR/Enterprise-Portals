import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdeliveryComponent } from './cpdelivery.component';

describe('CpdeliveryComponent', () => {
  let component: CpdeliveryComponent;
  let fixture: ComponentFixture<CpdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

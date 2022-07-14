import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpdashboardComponent } from './epdashboard.component';

describe('EpdashboardComponent', () => {
  let component: EpdashboardComponent;
  let fixture: ComponentFixture<EpdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

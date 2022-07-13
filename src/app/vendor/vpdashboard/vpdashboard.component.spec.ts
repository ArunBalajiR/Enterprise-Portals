import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpdashboardComponent } from './vpdashboard.component';

describe('VpdashboardComponent', () => {
  let component: VpdashboardComponent;
  let fixture: ComponentFixture<VpdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

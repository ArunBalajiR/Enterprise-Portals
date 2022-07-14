import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EploginComponent } from './eplogin.component';

describe('EploginComponent', () => {
  let component: EploginComponent;
  let fixture: ComponentFixture<EploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EploginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

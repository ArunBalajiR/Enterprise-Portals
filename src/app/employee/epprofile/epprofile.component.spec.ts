import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpprofileComponent } from './epprofile.component';

describe('EpprofileComponent', () => {
  let component: EpprofileComponent;
  let fixture: ComponentFixture<EpprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpprofileComponent } from './vpprofile.component';

describe('VpprofileComponent', () => {
  let component: VpprofileComponent;
  let fixture: ComponentFixture<VpprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpdebitComponent } from './vpdebit.component';

describe('VpdebitComponent', () => {
  let component: VpdebitComponent;
  let fixture: ComponentFixture<VpdebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpdebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpdebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

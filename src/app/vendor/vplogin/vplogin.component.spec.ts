import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VploginComponent } from './vplogin.component';

describe('VploginComponent', () => {
  let component: VploginComponent;
  let fixture: ComponentFixture<VploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VploginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

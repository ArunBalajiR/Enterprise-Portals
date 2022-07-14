import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpcreditComponent } from './vpcredit.component';

describe('VpcreditComponent', () => {
  let component: VpcreditComponent;
  let fixture: ComponentFixture<VpcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpcreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

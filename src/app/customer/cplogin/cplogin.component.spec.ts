import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CploginComponent } from './cplogin.component';

describe('CploginComponent', () => {
  let component: CploginComponent;
  let fixture: ComponentFixture<CploginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CploginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

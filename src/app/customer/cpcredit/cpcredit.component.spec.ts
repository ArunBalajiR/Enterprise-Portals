import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcreditComponent } from './cpcredit.component';

describe('CpcreditComponent', () => {
  let component: CpcreditComponent;
  let fixture: ComponentFixture<CpcreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpcreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpcreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

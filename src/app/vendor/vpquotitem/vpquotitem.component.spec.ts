import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpquotitemComponent } from './vpquotitem.component';

describe('VpquotitemComponent', () => {
  let component: VpquotitemComponent;
  let fixture: ComponentFixture<VpquotitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpquotitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpquotitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

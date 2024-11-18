import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAsaanbenefitsComponent } from './p-asaanbenefits.component';

describe('PAsaanbenefitsComponent', () => {
  let component: PAsaanbenefitsComponent;
  let fixture: ComponentFixture<PAsaanbenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAsaanbenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAsaanbenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

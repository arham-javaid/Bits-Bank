import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBenefitsComponent } from './p-benefits.component';

describe('PBenefitsComponent', () => {
  let component: PBenefitsComponent;
  let fixture: ComponentFixture<PBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

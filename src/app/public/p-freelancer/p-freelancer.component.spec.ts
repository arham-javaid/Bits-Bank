import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFreelancerComponent } from './p-freelancer.component';

describe('PFreelancerComponent', () => {
  let component: PFreelancerComponent;
  let fixture: ComponentFixture<PFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PFreelancerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

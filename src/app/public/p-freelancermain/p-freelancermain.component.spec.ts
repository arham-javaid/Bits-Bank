import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFreelancermainComponent } from './p-freelancermain.component';

describe('PFreelancermainComponent', () => {
  let component: PFreelancermainComponent;
  let fixture: ComponentFixture<PFreelancermainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PFreelancermainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PFreelancermainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

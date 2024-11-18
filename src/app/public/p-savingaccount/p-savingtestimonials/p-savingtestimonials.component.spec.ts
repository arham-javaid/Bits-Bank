import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSavingtestimonialsComponent } from './p-savingtestimonials.component';

describe('PSavingtestimonialsComponent', () => {
  let component: PSavingtestimonialsComponent;
  let fixture: ComponentFixture<PSavingtestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSavingtestimonialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PSavingtestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

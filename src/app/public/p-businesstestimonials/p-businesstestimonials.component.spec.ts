import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBusinesstestimonialsComponent } from './p-businesstestimonials.component';

describe('PBusinesstestimonialsComponent', () => {
  let component: PBusinesstestimonialsComponent;
  let fixture: ComponentFixture<PBusinesstestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBusinesstestimonialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBusinesstestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

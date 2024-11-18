import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCurrentbenefitsComponent } from './p-currentbenefits.component';

describe('PCurrentbenefitsComponent', () => {
  let component: PCurrentbenefitsComponent;
  let fixture: ComponentFixture<PCurrentbenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCurrentbenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCurrentbenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

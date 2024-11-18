import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFeaturedComponent } from './p-featured.component';

describe('PFeaturedComponent', () => {
  let component: PFeaturedComponent;
  let fixture: ComponentFixture<PFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PFeaturedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

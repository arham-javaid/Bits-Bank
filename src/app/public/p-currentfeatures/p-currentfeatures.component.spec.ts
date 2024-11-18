import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCurrentfeaturesComponent } from './p-currentfeatures.component';

describe('PCurrentfeaturesComponent', () => {
  let component: PCurrentfeaturesComponent;
  let fixture: ComponentFixture<PCurrentfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCurrentfeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCurrentfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

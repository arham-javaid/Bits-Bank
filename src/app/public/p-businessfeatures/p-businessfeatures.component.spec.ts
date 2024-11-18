import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBusinessfeaturesComponent } from './p-businessfeatures.component';

describe('PBusinessfeaturesComponent', () => {
  let component: PBusinessfeaturesComponent;
  let fixture: ComponentFixture<PBusinessfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBusinessfeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBusinessfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

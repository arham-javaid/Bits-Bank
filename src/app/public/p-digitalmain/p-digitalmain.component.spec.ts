import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDigitalmainComponent } from './p-digitalmain.component';

describe('PDigitalmainComponent', () => {
  let component: PDigitalmainComponent;
  let fixture: ComponentFixture<PDigitalmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDigitalmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PDigitalmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

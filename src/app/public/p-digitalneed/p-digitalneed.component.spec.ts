import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDigitalneedComponent } from './p-digitalneed.component';

describe('PDigitalneedComponent', () => {
  let component: PDigitalneedComponent;
  let fixture: ComponentFixture<PDigitalneedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDigitalneedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PDigitalneedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

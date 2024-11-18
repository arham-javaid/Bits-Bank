import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDigitalfoursComponent } from './p-digitalfours.component';

describe('PDigitalfoursComponent', () => {
  let component: PDigitalfoursComponent;
  let fixture: ComponentFixture<PDigitalfoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDigitalfoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PDigitalfoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDigitalComponent } from './p-digital.component';

describe('PDigitalComponent', () => {
  let component: PDigitalComponent;
  let fixture: ComponentFixture<PDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDigitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

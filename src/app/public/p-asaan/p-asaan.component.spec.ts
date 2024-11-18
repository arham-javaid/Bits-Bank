import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAsaanComponent } from './p-asaan.component';

describe('PAsaanComponent', () => {
  let component: PAsaanComponent;
  let fixture: ComponentFixture<PAsaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAsaanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAsaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

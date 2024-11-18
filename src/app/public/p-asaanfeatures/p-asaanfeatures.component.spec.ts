import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAsaanfeaturesComponent } from './p-asaanfeatures.component';

describe('PAsaanfeaturesComponent', () => {
  let component: PAsaanfeaturesComponent;
  let fixture: ComponentFixture<PAsaanfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAsaanfeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAsaanfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

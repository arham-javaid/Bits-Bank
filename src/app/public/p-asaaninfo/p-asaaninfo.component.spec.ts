import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAsaaninfoComponent } from './p-asaaninfo.component';

describe('PAsaaninfoComponent', () => {
  let component: PAsaaninfoComponent;
  let fixture: ComponentFixture<PAsaaninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PAsaaninfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAsaaninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHomemainComponent } from './p-homemain.component';

describe('PHomemainComponent', () => {
  let component: PHomemainComponent;
  let fixture: ComponentFixture<PHomemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PHomemainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PHomemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

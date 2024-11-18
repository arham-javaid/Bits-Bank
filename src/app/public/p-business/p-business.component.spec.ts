import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBusinessComponent } from './p-business.component';

describe('PBusinessComponent', () => {
  let component: PBusinessComponent;
  let fixture: ComponentFixture<PBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

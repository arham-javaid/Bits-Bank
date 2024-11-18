import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBusinessstepsComponent } from './p-businesssteps.component';

describe('PBusinessstepsComponent', () => {
  let component: PBusinessstepsComponent;
  let fixture: ComponentFixture<PBusinessstepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBusinessstepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBusinessstepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

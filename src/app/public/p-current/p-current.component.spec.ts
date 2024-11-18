import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCurrentComponent } from './p-current.component';

describe('PCurrentComponent', () => {
  let component: PCurrentComponent;
  let fixture: ComponentFixture<PCurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCurrentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

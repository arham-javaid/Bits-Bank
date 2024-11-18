import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCurrentoverviewComponent } from './p-currentoverview.component';

describe('PCurrentoverviewComponent', () => {
  let component: PCurrentoverviewComponent;
  let fixture: ComponentFixture<PCurrentoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCurrentoverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PCurrentoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

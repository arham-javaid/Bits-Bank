import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSavingComponent } from './p-saving.component';

describe('PSavingComponent', () => {
  let component: PSavingComponent;
  let fixture: ComponentFixture<PSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PKonnectComponent } from './p-konnect.component';

describe('PKonnectComponent', () => {
  let component: PKonnectComponent;
  let fixture: ComponentFixture<PKonnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PKonnectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PKonnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

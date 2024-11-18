import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRegisterComponent } from './p-register.component';

describe('PRegisterComponent', () => {
  let component: PRegisterComponent;
  let fixture: ComponentFixture<PRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

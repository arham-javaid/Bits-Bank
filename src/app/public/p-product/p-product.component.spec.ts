import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PProductComponent } from './p-product.component';

describe('PProductComponent', () => {
  let component: PProductComponent;
  let fixture: ComponentFixture<PProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

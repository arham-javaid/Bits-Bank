import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHeaderComponent } from './p-header.component';

describe('PHeaderComponent', () => {
  let component: PHeaderComponent;
  let fixture: ComponentFixture<PHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

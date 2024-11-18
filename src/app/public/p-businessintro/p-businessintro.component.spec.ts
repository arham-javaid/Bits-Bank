import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PBusinessintroComponent } from './p-businessintro.component';

describe('PBusinessintroComponent', () => {
  let component: PBusinessintroComponent;
  let fixture: ComponentFixture<PBusinessintroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PBusinessintroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PBusinessintroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSavingaccountComponent } from './p-savingaccount.component';

describe('PSavingaccountComponent', () => {
  let component: PSavingaccountComponent;
  let fixture: ComponentFixture<PSavingaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSavingaccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PSavingaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

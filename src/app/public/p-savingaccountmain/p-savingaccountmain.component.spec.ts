import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSavingaccountmainComponent } from './p-savingaccountmain.component';

describe('PSavingaccountmainComponent', () => {
  let component: PSavingaccountmainComponent;
  let fixture: ComponentFixture<PSavingaccountmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PSavingaccountmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PSavingaccountmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

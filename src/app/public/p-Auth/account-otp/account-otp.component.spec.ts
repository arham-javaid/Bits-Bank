import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOtpComponent } from './account-otp.component';

describe('AccountOtpComponent', () => {
  let component: AccountOtpComponent;
  let fixture: ComponentFixture<AccountOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

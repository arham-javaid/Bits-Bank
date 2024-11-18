import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBookListComponent } from './log-book-list.component';

describe('LogBookListComponent', () => {
  let component: LogBookListComponent;
  let fixture: ComponentFixture<LogBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

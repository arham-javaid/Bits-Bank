import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../Services/user-services';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { LogBookListComponent } from '../log-book-list/log-book-list.component';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../Services/transaction-service copy';


interface TransactionInfo {
  date: string;
  totalDebit: number;
  totalCredit: number;
}

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class MainComponent implements OnInit {
  commonDate: Date | null = null;
  totalTransactions: TransactionInfo[] = [];
  debitTransactions = 0; 
  creditTransactions = 0;
  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: [null, Validators.required],
    });

    this.fetchTransactions();
  }

  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }

  fetchTransactions() {
    this.transactionService.getTransactions().then(
      (response: any) => {
        console.log(response, "<<<<<<<<<<<");
  
        // Initialize totalDebit and totalCredit
        let totalDebit = 0;
        let totalCredit = 0;
  
        response.transactions?.forEach((day: any) => {
          totalDebit += day.totalDebit;
          totalCredit += day.totalCredit;
        });
  
        // Assign totalDebit and totalCredit
        this.debitTransactions = totalDebit;
        this.creditTransactions = totalCredit;
  
        console.log('Total Debit Transactions:', this.debitTransactions);
        console.log('Total Credit Transactions:', this.creditTransactions);
  
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
  
  
 
}







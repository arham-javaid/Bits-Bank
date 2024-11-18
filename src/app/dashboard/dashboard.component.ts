import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../Services/transaction-service copy';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  debitData: { date: string, amount: number }[] = [];
  creditData: { date: string, amount: number }[] = [];

  constructor(private transactionService: TransactionService) { }

  
  ngOnInit(): void {

    this.fetchDateWiseTransactions()
    // Sample data
  }

  async fetchDateWiseTransactions(): Promise<void> {
    try {
      const transactions = await this.transactionService.getDateWiseTransactions();
      console.log(transactions,"<<<<<<<");
      
      if (transactions) {
        transactions.forEach((transaction: any) => {
          if (transaction.totals) {
            const { date, totals } = transaction;
            if (totals.debit) {
              this.debitData.push({ date, amount: totals.debit });
            }
            if (totals.credit) {
              this.creditData.push({ date, amount: totals.credit });
            }
          }
        });

        console.log(this.debitData, "debitData");
        console.log(this.creditData, "creditData");
      }
      
    } catch (error) {
      console.error('Error fetching date-wise transactions:', error);
    }
  }
}

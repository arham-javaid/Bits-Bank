import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { TransactionService } from '../Services/transaction-service copy';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      phone: [ '', [ Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  submitTransactionForm() {
    if (this.transactionForm.valid) {
      console.log('Form Submitted:', this.transactionForm.value);

      const phone = { 
        phone : this.transactionForm.get('phone')?.value

      }

      this.transactionService.getAllTransactionsByPhone(phone).then(
        response => {
          console.log('Transaction fetched successfully:', response);
          this.transactionForm.reset();
        },
        error => {
          console.error('Error fetching transaction:', error);
        }
      );
    
    }}
}

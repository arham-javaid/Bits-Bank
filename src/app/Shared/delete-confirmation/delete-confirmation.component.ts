import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  @Output() onActionTaken = new EventEmitter<boolean>();

  onConfirmation(result: boolean = false) {
    this.onActionTaken.emit(result);
  }

}

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-message',
  standalone: true,
  imports: [],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.scss'
})
export class ConfirmMessageComponent {
	message = input<string>('');
	closeDialog = output<any>();

	onCloseDialog(confirm: boolean): void {
		this.closeDialog.emit(confirm);
	}
}

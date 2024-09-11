import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-status-message',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './status-message.component.html',
	styleUrl: './status-message.component.scss'
})
export class StatusMessageComponent {
	status = input<'success' | 'error'>('success')
	message = input<string>('')
	closeDialog = output<void>();

	onCloseDialog(): void {
		this.closeDialog.emit();
	}
}

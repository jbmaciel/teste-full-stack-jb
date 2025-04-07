import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() titulo: string = '';
  @Input() mensagem: string = '';
  @Input() status: string = '';
  @Input() modalId: string = 'modal-default'; // permite múltiplos modais
  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
  }
}

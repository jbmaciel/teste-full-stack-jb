import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, SimpleChanges, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true, // Define como standalone
  templateUrl: './dropdown.component.html',
  imports: [CommonModule],

  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() options: any[] = []; // Lista de opções recebidas
  @Input() minSelection: number = 1; // Número mínimo de seleções
  @Output() selectionChange = new EventEmitter<number[]>(); // Evento para emitir os selecionados
  @Input() selected: number[] = [];

  isOpen = false;
  selectedIds: number[] = []; // Lista para enviar na API
  selectedNames: string[] = []; // Lista para exibir no botão

  constructor(private eRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'] && this.selected) {
      this.selectedIds = [...this.selected];
      this.selectedNames = this.options
        .filter(option => this.selectedIds.includes(option.id))
        .map(option => option.nome);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }


  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleSelection(option: any) {
    const index = this.selectedIds.indexOf(option.id);

    if (index === -1) {
      this.selectedIds.push(option.id);
      this.selectedNames.push(option.nome);
    } else {
      this.selectedIds.splice(index, 1);
      this.selectedNames.splice(index, 1);
    }
    this.selectionChange.emit(this.selectedIds);
  }

  get buttonLabel(): string {
    return this.selectedNames.length > 0
      ? this.selectedNames.join(', ')
      : 'Selecione pelo menos 5 opções';
  }


}

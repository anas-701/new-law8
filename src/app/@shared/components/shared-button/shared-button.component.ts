import {  NgClass } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
})
export class SharedButtonComponent {
  @Input() styleClass?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() btnType: string = 'button';
  isLoading = input(false)

  @Output() onClick: any = new EventEmitter();
  click(e:any) {
    this.onClick.emit(e);
  }
}

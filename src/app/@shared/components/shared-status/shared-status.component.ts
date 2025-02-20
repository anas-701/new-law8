import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shared-status',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './shared-status.component.html',
  styleUrl: './shared-status.component.scss'
})
export class SharedStatusComponent {
  @Input() statusConfig:any;
  @Input() data:any
}

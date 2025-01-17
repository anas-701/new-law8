import { Component } from '@angular/core';
import { SharedButtonComponent } from '../shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-empty-section',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './shared-empty-section.component.html',
  styleUrl: './shared-empty-section.component.scss'
})
export class SharedEmptySectionComponent {

}

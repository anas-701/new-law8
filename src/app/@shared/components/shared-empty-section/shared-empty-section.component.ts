import { Component } from '@angular/core';
import { SharedButtonComponent } from '../shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shared-empty-section',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule
  ],
  templateUrl: './shared-empty-section.component.html',
  styleUrl: './shared-empty-section.component.scss'
})
export class SharedEmptySectionComponent {

}

import { Component, Input } from '@angular/core';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-clients-editor-address',
  standalone: true,
  imports: [
    FormlyConfigModule,
  ],
  templateUrl: './clients-editor-address.component.html',
  styleUrl: './clients-editor-address.component.scss'
})
export class ClientsEditorAddressComponent {
  @Input() formly: any;
  @Input() formlyFields: any;
  @Input() formlyModel: any;
  @Input() options:any;
}

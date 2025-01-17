import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { clientsEditorAddressFormlyFieldsConfig } from './clients-editor-address-formly-fields.config';

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
  @Input() formly: FormGroup=new FormGroup({});
  @Input() formlyModel: any;
  @Input() options:any;
  formlyFields: any = clientsEditorAddressFormlyFieldsConfig()  ;
}

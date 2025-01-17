import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-clients-editor-contact',
  standalone: true,
  imports: [
    FormlyConfigModule
  ],
  templateUrl: './clients-editor-contact.component.html',
  styleUrl: './clients-editor-contact.component.scss'
})
export class ClientsEditorContactComponent {
  @Input() formly:FormGroup=new FormGroup({}) ;
  @Input() formlyFields:any;  
  @Input() formlyModel:any;
  @Input() options:any;
}

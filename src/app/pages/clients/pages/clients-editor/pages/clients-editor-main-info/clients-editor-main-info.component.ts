import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-clients-editor-main-info',
  standalone: true,
  imports: [
    FormlyConfigModule
  ],
  templateUrl: './clients-editor-main-info.component.html',
  styleUrl: './clients-editor-main-info.component.scss'
})
export class ClientsEditorMainInfoComponent {
  @Input() formly:FormGroup=new FormGroup({});    
  @Input() formlyFields:any;
  @Input() formlyModel:any;
  @Input() options:any;
}

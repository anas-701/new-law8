import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { clientDetailsContactEditorFormlyConfig } from './client-details-contact-editor-formly.config';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-client-details-contacts-editor',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedButtonComponent
  ],
  templateUrl: './client-details-contacts-editor.component.html',
  styleUrl: './client-details-contacts-editor.component.scss'
})
export class ClientDetailsContactsEditorComponent extends FormBaseClass implements OnInit {
  mode!:string ;
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formlyFields = clientDetailsContactEditorFormlyConfig();
    this.setFormData();
  }
  setFormData(){
    this.formlyModel = {...this._dynamicDialogConfig.data.rowData};
    this.mode = this._dynamicDialogConfig.data.mode
    this.formlyOptions.formState={
      readonly:this.mode === 'view'
    }
  }
  onEdit(){
    this.formlyOptions.formState.readonly = false;
  }
  onSubmit(): void {
    // Add submit logic here
  }
}

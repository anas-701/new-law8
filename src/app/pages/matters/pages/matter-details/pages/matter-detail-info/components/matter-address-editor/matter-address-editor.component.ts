import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import { matterAddressFormlyFields } from './matter-address-editor-formly.config';

@Component({
  selector: 'app-matter-address-editor',
  standalone: true,
  imports: [
    SharedModule,
    FormlyConfigModule,
    SharedButtonComponent
  ],
  templateUrl: './matter-address-editor.component.html',
  styleUrl: './matter-address-editor.component.scss'
})
export class MatterAddressEditorComponent extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields=matterAddressFormlyFields(this)
  }
  reset(){
    
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }

}

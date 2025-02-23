import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { matterPartyEditorFieldsConfig } from './matter-party-editor-formly.config';
import { SharedModule } from 'src/app/@shared/shared.module';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-matter-party-editor',
  standalone: true,
  imports: [
    SharedModule,
    FormlyConfigModule,
    SharedButtonComponent
  ],
  templateUrl: './matter-party-editor.component.html',
  styleUrl: './matter-party-editor.component.scss'
})
export class MatterPartyEditorComponent extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields=matterPartyEditorFieldsConfig(this)
  }
  reset(){
    
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }

}

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { matterAdditionalFilterFields } from './matter-additional-filter-editor.config';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-matter-additional-filter-editor',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedButtonComponent
  ],
  templateUrl: './matter-additional-filter-editor.component.html',
  styleUrl: './matter-additional-filter-editor.component.scss'
})
export class MatterAdditionalFilterEditorComponent implements OnInit{
  protected _dynamicDialogRef = inject(DynamicDialogRef);
  private _dynamicDialogConfig = inject(DynamicDialogConfig);
  formly: FormGroup = new FormGroup({});
  formlyModel: any;
  formlyFields: FormlyFieldConfig[] = []
  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.formlyFields=matterAdditionalFilterFields();
    this.setForm()
  }
  setForm(){
    this.formlyModel = {...this._dynamicDialogConfig.data.formlyModel}
  }
  reset(){
    this.formlyModel={}
    this.formly.reset()
  }
  onSubmit(){
    this._dynamicDialogRef.close(this.formly.value)
  }
}

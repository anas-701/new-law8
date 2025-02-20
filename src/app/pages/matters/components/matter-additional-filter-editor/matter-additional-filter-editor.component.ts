import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { matterAdditionalFilterFields } from './matter-additional-filter-editor.config';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { combineLatest } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';

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
export class MatterAdditionalFilterEditorComponent extends FormBaseClass implements OnInit {
  ngOnInit(): void {
    this.getLookupsData()
  }
  override getLookupsData(): void {
    combineLatest({
      clients: this._apiService.get(API_Config.general.getClients),
    }).pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((res) => {
      this.lookupsData = res;
      this.initForm();
    })
  }
  initForm() {
    this.formlyFields = matterAdditionalFilterFields(this);
    this.setForm()
  }
  setForm() {
    this.formlyModel = { ...this._dynamicDialogConfig.data.formlyModel }
  }
  reset() {
    this.formlyModel = {}
    this.formly.reset()
  }
  onSubmit() {
    this._dynamicDialogRef.close(this.formly.value)
  }
}

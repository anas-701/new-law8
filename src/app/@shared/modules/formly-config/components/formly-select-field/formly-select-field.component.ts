import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-select-field',
  templateUrl: './formly-select-field.component.html',
  styleUrl: './formly-select-field.component.scss'
})
export class FormlySelectFieldComponent  extends FieldType <FieldTypeConfig>{
  change(e?: any) {
    if (this.props['onChange']) this.props['onChange'](e, this.field)
  }
}

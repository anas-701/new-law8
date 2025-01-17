import { Component, effect, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ClientsEditorAddressComponent } from './pages/clients-editor-address/clients-editor-address.component';
import { ClientsEditorContactComponent } from './pages/clients-editor-contact/clients-editor-contact.component';
import { ClientsEditorMainInfoComponent } from './pages/clients-editor-main-info/clients-editor-main-info.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-clients-editor',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule,
    ClientsEditorAddressComponent,
    ClientsEditorMainInfoComponent,
    ClientsEditorContactComponent,
    ReactiveFormsModule,
    FormsModule,
    FormlyConfigModule
  ],
  templateUrl: './clients-editor.component.html',
  styleUrl: './clients-editor.component.scss'
})
export class ClientsEditorComponent implements OnInit {
  _toggleFormService = inject(ToggleFormService);
  _router = inject(Router);
  formlyModel: any;
  formlyOptions: FormlyFormOptions={};
  formly: FormGroup = new FormGroup({});
  toggleEditEffect = effect(() => {
    if (!this._router.url.includes('add')) {
      console.log(this._toggleFormService.getToggleEdit())
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {
    if (!this._router.url.includes('add')) {
      this.setFormData()
    }

  }

  setFormData() {
    setTimeout(() => {
      this.formlyModel = {
        clientCode: 'C12345',
        clientName: 'John Doe',
        foreignName: 'جون دو',
        clientGroup: ['Group 1', 'Group 2'],
        introducingLawyer: 'Lawyer 2',
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'Country 1',
        zipCode: '12345',
        city: 'New York',
        state: 'NY',
        mobile1: '97129992',
        mobile2: '97129992',
        phone1: '97129992',
        phone2: '97129992',
        email1: 'johndoe@example.com',
        email2: 'johndoe@example.com'
      };
    }, 200);
  }

  onSubmit() {
    this._toggleFormService.updateToggleEdit(true)
    console.log(this.formlyModel);
  }
}

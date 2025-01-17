import { Component, effect, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ClientsEditorAddressComponent } from './pages/clients-editor-address/clients-editor-address.component';
import { ClientsEditorContactComponent } from './pages/clients-editor-contact/clients-editor-contact.component';
import { ClientsEditorMainInfoComponent } from './pages/clients-editor-main-info/clients-editor-main-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';

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
    
  ],
  templateUrl: './clients-editor.component.html',
  styleUrl: './clients-editor.component.scss'
})
export class ClientsEditorComponent extends FormBaseClass implements OnInit {
  _toggleFormService = inject(ToggleFormService); 
  toggleEditEffect = effect(() => {
    
    if(!this._router.url.includes('add')){
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.formlyFields = [
      {
        key: 'mainInfo',
        fieldGroupClassName: 'grid grid-cols-6 gap-4',
        fieldGroup: [
          {
            key: 'clientImage',
            type: 'upload-image',
            className: 'col-span-6',
            props: {
              label: 'Client Image',
              hint: 'Recommended Size 400*400 ',
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'clientCode',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Client Code',
              disabled: true
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'clientName',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Client Name',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'foreignName',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Foreign Name',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'clientGroup',
            type: 'multi-select',
            className: 'md:col-span-2',
            props: {
              label: 'Client Group',
              optionsArr: ['Group 1', 'Group 2', 'Group 3', 'Group 4'].map(item => ({ label: item, value: item }))
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'introducingLawyer',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Introducing Lawyer',
              optionsArr: ['Lawyer 1', 'Lawyer 2', 'Lawyer 3'].map(item => ({ label: item, value: item })),

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
        ]
      },
      {
        key: 'address',
        fieldGroupClassName: 'grid grid-cols-6 gap-4',
        fieldGroup: [
          {
            key: 'address1',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Address 1',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'address2',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Address 2',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'country',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Country',
              optionsArr: ['Country 1', 'Country 2', 'Country 3'].map(item => ({ label: item, value: item })),

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'zipCode',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Zip Code',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'city',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'City',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'state',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'State',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          }
        ]
      },
      {
        key: 'contact',
        fieldGroupClassName: 'grid grid-cols-6 gap-4',
        fieldGroup: [
          {
            key: 'phone1',
            // type: 'phone',
            type:'input',
            className: 'md:col-span-2',
            props: {
              label: 'Phone 1'
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'mobile1',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Mobile 1',
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'email',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Email',

            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },

        ],

      },

    ]
    if(!this._router.url.includes('add')){
      this.setFormData()
    }

  }
  setFormData(){
    this.formlyModel = {
      mainInfo: {
        clientCode: 'C12345',
        clientName: 'John Doe',
        foreignName: 'جون دو',
        clientGroup: ['Group 1', 'Group 2'],
        introducingLawyer: 'Lawyer 2'
      },
      address: {
        address1: '123 Main St',
        address2: 'Apt 4B',
        country: 'Country 1',
        zipCode: '12345',
        city: 'New York',
        state: 'NY'
      },
      contact: {
        phone1: '+9715555678',
        mobile1: '+9715555678',
        email: 'johndoe@example.com'
      }
    };
  }
  getFields(keyName: string) {
    return this.formlyFields.filter(fields => fields.key == keyName)
  }
  onSubmit() {
    console.log(this.formly.value);
  }
}

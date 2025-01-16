import { Component, effect, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ClientsEditorAddressComponent } from './pages/clients-editor-address/clients-editor-address.component';
import { ClientsEditorContactComponent } from './pages/clients-editor-contact/clients-editor-contact.component';
import { ClientsEditorMainInfoComponent } from './pages/clients-editor-main-info/clients-editor-main-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-editor',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule,
    ClientsEditorAddressComponent,
    ClientsEditorMainInfoComponent,
    ClientsEditorContactComponent,
    ReactiveFormsModule
  ],
  templateUrl: './clients-editor.component.html',
  styleUrl: './clients-editor.component.scss'
})
export class ClientsEditorComponent extends FormBaseClass implements OnInit {

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
            key: 'clientCode',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Client Code',
              disabled: true
            }
          },
          {
            key: 'clientName',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Client Name',
            }
          },
          {
            key: 'foreignName',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Foreign Name',
            }
          },
          {
            key: 'clientGroup',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Client Group',
              options: ['Group 1', 'Group 2', 'Group 3'].map(item => ({ label: item, value: item }))
            }
          },
          {
            key: 'introducingLawyer',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Introducing Lawyer',
              options: ['Lawyer 1', 'Lawyer 2', 'Lawyer 3'].map(item => ({ label: item, value: item }))
            }
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
              label: 'Address 1'
            }
          },
          {
            key: 'address2',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Address 2'
            }
          },
          {
            key: 'country',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Country',
              options: ['Country 1', 'Country 2', 'Country 3'].map(item => ({ label: item, value: item }))
            }
          },
          {
            key: 'zipCode',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Zip Code'
            }
          },
          {
            key: 'city',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'City'
            }
          },
          {
            key: 'state',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'State'
            }
          }
        ]
      },
      {
        key: 'contact',
        fieldGroupClassName: 'grid grid-cols-6 gap-4',
        fieldGroup: [
          {
            key: 'phone1',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Phone 1'
            }
          },
          {
            key: 'mobile1',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Mobile 1'
            }
          },
          {
            key: 'email',
            type: 'input',
            className: 'md:col-span-2',
            props: {
              label: 'Email'
            }
          }
        ],
        expressions: {
          'props.readonly': 'formState.readonly',
        },
      },

    ]
    this.formlyModel = {
      mainInfo: {
        clientCode: 'C12345',
        clientName: 'John Doe',
        foreignName: 'جون دو',
        clientGroup: 'Group 1',
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
        phone1: '555-1234',
        mobile1: '555-5678',
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

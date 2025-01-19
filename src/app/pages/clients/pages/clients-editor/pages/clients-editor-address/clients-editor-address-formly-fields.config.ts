import { ClientsEditorAddressComponent } from './clients-editor-address.component';
export function clientsEditorAddressFormlyFieldsConfig(THIS:ClientsEditorAddressComponent){
  return [
    {
        fieldGroupClassName: 'grid grid-cols-6 gap-4',
        fieldGroup: [
          {
            key: 'address1',
            type: 'input',
            className: 'md:col-span-4',
            props: {
              label: 'Address 1',
  
            },
            expressions: {
              'props.readonly': 'formState.readonly',
            },
          },
          {
            key: 'zIpCode',
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
            key: 'countryId',
            type: 'select',
            className: 'md:col-span-2',
            props: {
              label: 'Country',
              optionsArr: THIS.lookupsData.country,
              optionLabel: 'name',
              optionValue: 'id',
  
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
  ];
}


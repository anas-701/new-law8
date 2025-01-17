import { FormlyFieldConfig } from '@ngx-formly/core';

export function  clientsEditorMainInfoFormlyFieldsConfig():FormlyFieldConfig[]{
  return [
    {
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
  ];
}

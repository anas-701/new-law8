import { FormlyFieldConfig } from "@ngx-formly/core";

export function clientDetailsContactEditorFormlyConfig():FormlyFieldConfig[]{
    return [
        {
            fieldGroupClassName: 'grid grid-cols-2 gap-4',
            fieldGroup: [
                {
                    key: 'firstName',
                    type: 'input',
                    props: {
                        label: 'First Name'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'lastName',
                    type: 'input',
                    props: {
                        label: 'Last Name'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'position',
                    type: 'input',
                    props: {
                        label: 'Position'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'email',
                    type: 'input',
                    props: {
                        label: 'Email'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'phone',
                    type: 'phone',
                    props: {
                        label: 'Phone'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'mobile',
                    type: 'phone',
                    props: {
                        label: 'Mobile'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'fax',
                    type: 'input',
                    props: {
                        label: 'Fax'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'remark',
                    type: 'input',
                    props: {
                        label: 'Remark'
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                }
            ]
        }
    ]
}
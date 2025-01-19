export function clientsEditorContactFormlyFieldsConfig() {
    return [
        {
            fieldGroupClassName: 'grid grid-cols-6 gap-4 mb-4',
            fieldGroup: [
                {
                    key: 'mobile1',
                    type: 'phone',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Mobile 1',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'mobile2',
                    type: 'phone',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Mobile 2',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
            ]
        },
        {
            fieldGroupClassName: 'grid grid-cols-6 gap-4 mb-4',
            fieldGroup: [
                {
                    key: 'phone1',
                    type: 'phone',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Phone 1',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'phone2',
                    type: 'phone',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Phone 2',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
            ]
        },
        {
            fieldGroupClassName: 'grid grid-cols-6 gap-4',
            fieldGroup: [
                {
                    key: 'email',
                    type: 'input',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Email 1',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                    validators: {
                        validation: ['email'],
                    },
                },
                {
                    key: 'email2',
                    type: 'input',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Email 2',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                    validators: {
                        validation: ['email'],
                    },
                },
            ]
        },

    ];
}   
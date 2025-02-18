import { FormlyFieldConfig } from "@ngx-formly/core";

export function matterAdditionalFilterFields():FormlyFieldConfig[]{
    return [
        {
            fieldGroupClassName:'grid md:grid-cols-2 gap-4',
            fieldGroup:[
                {
                    type:'select',
                    key:'client',
                    props:{
                        label:'Client',
                        optionsArr:['client 1','client 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'practiceArea',
                    props:{
                        label:'Practice Area',
                        optionsArr:['Practice Area 1','Practice Area 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'category',
                    props:{
                        label:'Category',
                        optionsArr:['Category 1','Category 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'matterType',
                    props:{
                        label:'Matter Type',
                        optionsArr:['Matter Type 1','Matter Type 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'status',
                    props:{
                        label:'Status',
                        optionsArr:['Status 1','Status 2'].map(val=>({label:val,value:val}))
                    }
                },
            ]
        }
    ]
}
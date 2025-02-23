import { MatterPartyType } from "src/app/pages/matters/enums/matter-partyType";


export const matter_Parties_statusConfig = {
    [MatterPartyType.Client]: {
        style: 'bg-success50 text-success600',
    },
    [MatterPartyType.Opponent]: {
        style: 'bg-error50 text-textErrorPrimary',
    },
    [MatterPartyType.Others]: {
        style: 'bg-alert50 text-alert600',
    },
    [MatterPartyType.Judge]: {
        style: 'bg-blue50 text-blue600',
    },
    [MatterPartyType.Expert]: {
        style: 'bg-blue50 text-blue600',
    },
    
};

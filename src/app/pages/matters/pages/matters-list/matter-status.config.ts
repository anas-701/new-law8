import { MatterStatus } from "../../enums/matter-status";

export const matter_statusConfig = {
    [MatterStatus.NewCase]: {
        label: MatterStatus.NewCase,
        style: 'bg-success50 text-success600',
    },
    [MatterStatus.DraftCase]: {
        label: MatterStatus.DraftCase,
        style: 'bg-success50 text-success600',
    },
    [MatterStatus.CourtRegistration]: {
        label: MatterStatus.CourtRegistration,
        style: 'bg-success50 text-success600',
    },
    [MatterStatus.FirstHearing]: {
        label: MatterStatus.FirstHearing,
        style: 'bg-alert50 text-alert600',
    },
    [MatterStatus.PleadingStage]: {
        label: MatterStatus.PleadingStage,
        style: 'bg-alert50 text-alert600',
    },
    [MatterStatus.ReturnedForPleading]: {
        label: MatterStatus.ReturnedForPleading,
        style: 'bg-alert50 text-alert600',
    },
    [MatterStatus.UnderProcess]: {
        label: MatterStatus.UnderProcess,
        style: 'bg-alert50 text-alert600',
    },
    [MatterStatus.AppealPeriod]: {
        label: MatterStatus.AppealPeriod,
        style: 'bg-error50 text-textErrorPrimary',
    },
    [MatterStatus.FinalJudgment]: {
        label: MatterStatus.FinalJudgment,
        style: 'bg-blue50 text-blue600',
    },
    [MatterStatus.CombinedCase]: {
        label: MatterStatus.CombinedCase,
        style: 'bg-blue50 text-blue600',
    },
    [MatterStatus.Transferred]: {
        label: MatterStatus.Transferred,
        style: 'bg-blue50 text-blue600',
    },
    [MatterStatus.TransferredToPublicProsecution]: {
        label: MatterStatus.TransferredToPublicProsecution,
        style: 'bg-blue50 text-blue600',
    },
    [MatterStatus.Closed]: {
        label: MatterStatus.Closed,
        style: 'bg-grey100 text-textTertairy',
    },
    [MatterStatus.Adjudicated]: {
        label: MatterStatus.Adjudicated,
        style: 'bg-grey100 text-textTertairy',
    },
};

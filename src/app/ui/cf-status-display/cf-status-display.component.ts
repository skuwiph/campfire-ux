import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cf-status-display',
  templateUrl: './cf-status-display.component.html',
  styleUrls: ['./cf-status-display.component.scss']
})
export class CfStatusDisplayComponent implements OnInit {
    @Input() status!: string;

    ngOnInit(): void {
        this.stateMap = new Map<string, string>([
            ['AcceptedOnProgramme', 'Interview Report Submitted'],
            ['ORCAReject', 'Rejected by Orca'],
            ['ParticipantApplied', 'Applied'],
            ['ParticipantAppliedPFT', 'Applied (PFT)'],
            ['ParticipantNullState', 'Error (PNS)'],
            ['ParticipantOutOfProgrammeCNX', 'OOP - Cancelled'],
            ['ParticipantOutOfProgrammeEXP', 'OOP - Expired'],
            ['ParticipantOutOfProgrammeFAI', 'OOP - Failed'],
            ['ParticipantOutOfProgrammeREJ', 'OOP - Rejected'],
            ['ParticipantOutOfProgrammeTER', 'OOP - Terminated'],
            ['ParticipantOutOfProgrammeUNS', 'OOP - Unsuccessful'],
            ['ParticipantPlaced', 'Placed'],
            ['ParticipantReadyToPlace', 'Ready to Place'],
            ['ParticipantReadyToPlaceGP', 'Ready to Place (GP)'],
            ['ParticipantReadyToPlaceMM', 'Ready to Place (RSG)'],
            ['PendingAcceptanceAsReturner', 'Returner Awaiting Acceptance'],
            ['PostInterview', 'Post-Interview'],
            ['PreInterview', 'Pre-Interview'],
            ['RejectedByInterviewer', 'Rejected by Interviewer'],
            ['RejectedByOffice', 'Rejected by Office'],
            ['Returner', 'Returner Completing Form'],
            ['ReturnToORCA', 'Resend to ORCA'],
            ['TransferredToORCA', 'Transferred to ORCA'],
            ['ParticipantReadyToPlace', 'Ready to Place'],
            ['ParticipantReadyToPlaceCE', 'Ready to Place (CE)'],
            ['ParticipantReadyToPlaceGP', 'Ready to Place (GP)'],
            ['ParticipantReadyToPlaceMM', 'Ready to Place (MM)']]);

        this.stateName = this.stateMap.get(this.status) ?? `Unknown (${this.status})`;
        this.stateClass = this.getStateDisplayClass();
    }

    getStateDisplayClass() {
        switch (this.status) {
            case 'AcceptedOnProgramme':
                return 'accepted';
            case 'PreInterview':
                return 'preinterview';
            case 'PostInterview':
                return 'postinterview';
            case 'Returner':
                return 'returner';
            case 'PendingAcceptanceAsReturner':
                return 'pendingAcceptance';
            case 'ORCAReject':
                return 'orcaReject';
            case 'ReturnToORCA':
                return 'orcaResubmit';
            case 'TransferredToORCA':
                return 'orcaTransfer';
            case 'RejectedByInterviewer':
            case 'RejectedByOffice':
                return 'rejected';
            case 'ParticipantApplied':
            case 'ParticipantAppliedPFT':
                return 'applied';
            case 'ParticipantReadyToPlace':
            case 'ParticipantReadyToPlaceCE':
            case 'ParticipantReadyToPlaceGP':
            case 'ParticipantReadyToPlaceMM':
                return 'rtp';
            case 'ParticipantPlaced':
                return 'placed';
            case 'ParticipantOutOfProgrammeCNX':
            case 'ParticipantOutOfProgrammeEXP':
            case 'ParticipantOutOfProgrammeFAI':
            case 'ParticipantOutOfProgrammeREJ':
            case 'ParticipantOutOfProgrammeTER':
            case 'ParticipantOutOfProgrammeUNS':
                return 'oop';
            default:
                return 'defaultStatus';
        };
        return {};
    }

    stateClass!: {};
    stateName!: string;
    private stateMap!: Map<string, string>;
}

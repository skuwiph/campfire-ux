import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cf-applicant-card',
  templateUrl: './cf-applicant-card.component.html',
  styleUrls: ['./cf-applicant-card.component.scss']
})
export class CfApplicantCardComponent implements OnInit {
    @Input() applicant!: ICFApplicantCardInfo;
    @Output() cardClick = new EventEmitter<number>();

    ngOnInit(): void {
        const a = this.applicant;
        this.urlOrInitials = a.profileUrl ? a.profileUrl : `${a.firstName.substring(0,1)}${a.lastName.substring(0,1)}`;
    }

    onClick(event: Event): void {
        this.cardClick.emit(this.applicant.applicationId);
        event.stopImmediatePropagation();
    }

    urlOrInitials = '??';
}

export interface ICFApplicantCardInfo {
    applicationId: number;
    profileUrl?: string;
    firstName: string;
    lastName: string;
    status: string;
    profile?: string;
}
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cf-application-card',
    templateUrl: './cf-application-card.component.html',
    styleUrls: ['./cf-application-card.component.scss']
})
export class CfApplicationCardComponent {
    @Input() title = 'Card Title';
    @Input() clickable = false;
    @Input() status = CFApplicationCardStatus.AllGood;
    @Output() onCardClicked = new EventEmitter();

    cardClicked(): void {
        this.onCardClicked.emit();
    }
}

export enum CFApplicationCardStatus {
    AllGood = "good",
    Office = "office",
    Applicant = "applicant",
    ThirdParty = "third"
}
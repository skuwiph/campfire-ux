import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-cf-user-profile-stack',
    templateUrl: './cf-user-profile-stack.component.html',
    styleUrls: ['./cf-user-profile-stack.component.scss']
})
export class CfUserProfileStackComponent implements OnChanges {
    @Input() users: ICFUser[] = [];
    @Input() width = 60;
    @Input() height = 60;

    stackHeight = `66px`;
    userStack: ICFUserStack[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["users"]) {
            this.calculateStackPositions();

        }
        if (changes["height"]) {
            this.stackHeight = `${this.height * 1.2}px`;
        }
    }

    calculateStackPositions(): void {
        this.userStack = [];
        var leftPos = 0;
        var zindex = 1;
        this.users.forEach(i => {
            const initial = `${i.firstName.substring(0, 1)}${i.lastName?.substring(0, 1)}`;
            const urlOrInitial = i.profileUrl ?? initial;
            this.userStack.push({ urlOrInitial: urlOrInitial, fullName: `${i.firstName} ${i.lastName}`, left: `${leftPos}px`, zindex: zindex });
            leftPos += this.width * 0.75;
            zindex += 1;
        });
    }
}

export interface ICFUser {
    profileUrl?: string;
    firstName: string;
    lastName: string;
}

export interface ICFUserStack {
    urlOrInitial: string;
    fullName: string;
    left: string;
    zindex: number;
}
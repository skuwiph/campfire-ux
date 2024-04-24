import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cf-entity-activity',
    templateUrl: './cf-entity-activity.component.html',
    styleUrls: ['./cf-entity-activity.component.scss']
})
export class CfEntityActivityComponent implements OnInit {
    @Input() entry!: ICFEntityActivity;

    ngOnInit(): void {
        //console.log(`Entry: ${JSON.stringify(this.entry, null, 2)}`);
    }
}
export interface ICFEntityActivity {
    profileOrInitials: string;
    fullName: string;
    date: string;
    comment: string;
}

export class CFEntityActivity implements ICFEntityActivity {
    profileOrInitials: string;
    fullName: string;
    date: string;
    comment: string;

    constructor(profile: string | undefined, firstName: string, lastName: string, date: string, comment: string) {
        if (profile) {
            this.profileOrInitials = profile;
        } else {
            if(lastName == '' ) {
                // console.log(`Found a missing last name: ${firstName}`);
                this.profileOrInitials = firstName;
            } else {
                this.profileOrInitials = `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
            }
        }

        this.fullName = `${firstName} ${lastName}`;
        this.date = date;
        this.comment = comment;
    }
}
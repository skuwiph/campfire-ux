import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cf-profile',
  templateUrl: './cf-profile.component.html',
  styleUrls: ['./cf-profile.component.scss']
})
export class CfProfileComponent implements OnInit {
    @Input() urlOrInitials!: string;
    @Input() roundImage = true;
    @Input() width = 60;
    @Input() height = 60;

    ngOnInit(): void {
        if(this.urlOrInitials.startsWith('http')) {
            this.url = this.urlOrInitials;
        } else {
            this.initials = this.urlOrInitials.toLocaleUpperCase();
        }
    }

    url?: string;
    initials?: string = '';
}

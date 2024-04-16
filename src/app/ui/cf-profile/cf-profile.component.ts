import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cf-profile',
  templateUrl: './cf-profile.component.html',
  styleUrls: ['./cf-profile.component.scss']
})
export class CfProfileComponent implements OnInit, OnChanges {
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

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["width"]) {
            this.widthPx = `${this.width}px`;
            this.fontSizePx = `${this.width/2}px`;
        }
        if (changes["height"]) {
            this.heightPx = `${this.height}px`;
            this.padTopPx = `${this.height/2.5}px`;
        }
    }

    url?: string;
    initials?: string = '';
    widthPx = "60px";
    heightPx = "60px";
    padTopPx = "0.15rem";
    fontSizePx = "30px";
}

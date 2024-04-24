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
            if (this.urlOrInitials?.length == 2) {
                this.initials = this.urlOrInitials.toLocaleUpperCase();
                const idx = this.convertNameToIndex(this.initials.substring(0, 1), this.initials.substring(1, 2));
                this.initialColor = this.colorOptions[idx];
            } else {
                this.special = true;
                this.initialColor = '#537d88';
                //console.log(`Initials are: ${this.urlOrInitials}`);
                switch (this.urlOrInitials.toLocaleUpperCase()) {               
                    case "SYSTEM":
                        this.specialClass = "fa-robot";
                        break;
                    case "ORCA":
                        this.specialClass = "fa-fish-fins";
                        break;
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["width"]) {
            this.widthPx = `${this.width}px`;
            this.fontSizePx = `${this.width/2}px`;
            if(this.width > 60) {
                this.marginTop = `-${this.width * 0.005}rem`;
            }
        }
        if (changes["height"]) {
            this.heightPx = `${this.height}px`;
        }
    }

    convertNameToIndex(f: string, l: string): number {
        let n = 0;

        const fn = parseInt(f, 36) - 9;
        const ln = parseInt(l, 36) - 9;

        n = fn + (26 + (2*ln));

        // console.log(`Number from ${f} and ${l} is: ${fn} and ${ln} color: ${this.colorOptions[n]}`);

        return n % this.colorOptions.length - 1;
    }

    url?: string;
    initials?: string = '';
    widthPx = "60px";
    heightPx = "60px";
    fontSizePx = "30px";
    marginTop = '0rem';
    special = false;
    specialClass = '';

    initialColor = '';
    // 65 options
    colorOptions = [        
    '#3e3546',
    '#625565',
    '#966c6c',
    '#ab947a',
    '#694f62',
    '#7f708a',
    '#9babb2',
    '#c7dcd0',
    '#ffffff',
    '#6e2727',
    '#b33831',
    '#ea4f36',
    '#f57d4a',
    '#ae2334',
    '#e83b3b',
    '#fb6b1d',
    '#f79617',
    '#f9c22b',
    '#7a3045',
    '#9e4539',
    '#cd683d',
    '#e6904e',
    '#fbb954',
    '#4c3e24',
    '#676633',
    '#a2a947',
    '#d5e04b',
    '#fbff86',
    '#165a4c',
    '#239063',
    '#1ebc73',
    '#91db69',
    '#cddf6c',
    '#313638',
    '#374e4a',
    '#547e64',
    '#92a984',
    '#b2ba90',
    '#0b5e65',
    '#0b8a8f',
    '#0eaf9b',
    '#30e1b9',
    '#8ff8e2',
    '#A2A303',
    '#484a77',
    '#4d65b4',
    '#4d9be6',
    '#8fd3ff',
    '#45299f',
    '#6b3e75',
    '#905ea9',
    '#a884f3',
    '#eaaded',
    '#753c54',
    '#a24b6f',
    '#cf657f',
    '#ed8099',
    '#831c5d',
    '#c32454',
    '#f04f78',
    '#f68181',
    '#fca790',
    '#fdcbb0',
    ];
}

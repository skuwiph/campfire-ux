import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './sticky-layout.component.html',
    // styleUrls: ['./app.component.scss']
    styles: [`
    .container { 
        .menu {
            position: sticky;
            top: 0;
            z-index: 2;
        }
        display: flex; 
        flex-direction: column;
        min-height: 100vh;
    }
    .content {
        flex: 1 0 auto;
    }    
    footer {
        border: 1px dotted gray;
        background-color: gray;
        color: white;
        padding: 0 0.5rem;
        min-height: 5rem;
        text-align: center;
    }
    footer p {
        margin-top: 1.75rem;
    }
    `],
})
export class StickyLayoutComponent implements OnInit {
    ngOnInit(): void {
        
    }
}
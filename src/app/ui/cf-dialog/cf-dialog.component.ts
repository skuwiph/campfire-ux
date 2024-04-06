import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cf-dialog',
  templateUrl: './cf-dialog.component.html',
  styleUrls: ['./cf-dialog.component.scss']
})
export class CfDialogComponent {
    @Input() title = 'Title';
    @ViewChild('dialog') dialog?: ElementRef;

    openDialog(): void {
        this.dialog?.nativeElement.showModal();
    }

    closeDialog(): void {
        //console.log(`closeDialog`);
        this.dialog?.nativeElement.close();
    }
}

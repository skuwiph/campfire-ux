import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CFButtonType } from '../cf-button/cf-button.component';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui.module';

@Component({
    //selector: 'app-cf-modal',

    standalone: true,
    imports: [CommonModule, UiModule],    
    templateUrl: './cf-modal.component.html',
    styleUrls: ['./cf-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CfModalComponent {
    @ViewChild('modal') modal?: ElementRef;

    @Input() type = CFModalType.Information;
    @Input() title = 'Title';
    @Input() message = '<p>Message</p>';
    @Input() buttons: CFModalButton[] = [];

    @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
    @Output() onSelected: EventEmitter<string> = new EventEmitter<string>();

    buttonSelected(id: string): void {
        this.onSelected.emit(id);
        this.onRemove.emit('');
    }

    closeDialog(): void {
        this.modal?.nativeElement.close();
        this.onRemove.emit('');
    }
}

export enum CFModalType {
    Information = "information",
    Warning = "warning",
    Error = "error",
    Confirmation = "confirmation"
}

export interface CFModalButton {
    type: CFButtonType;
    text: string;
    id: string;
}

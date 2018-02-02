import { AfterViewInit, Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
    @ViewChild('modal') modal: ElementRef;
    @Input() dismissible = true;

    @Output() closed = new EventEmitter<any>();

    _isOpen = false;
    private $modal;

    constructor() {
    }

    open() {
        this.$modal.modal('open');
        this._isOpen = true;
    }

    close() {
        this.$modal.modal('close');
        this.closed.emit();
        this._isOpen = false;
    }

    isOpen() {
        return this._isOpen;
    }

    public ngAfterViewInit(): void {
        this.$modal = $(this.modal.nativeElement).modal({
            dismissible: this.dismissible,
            complete: () => {
                this.closed.emit();
                this._isOpen = false;
            }
        });
    }
}

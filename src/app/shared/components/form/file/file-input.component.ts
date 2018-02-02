import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FileUpload } from "primeng/primeng";

@Component({
    selector: 'app-file-input',
    templateUrl: './file-input.component.html',
    styleUrls: ['./file-input.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FileInputComponent implements OnInit {
    @ViewChild('fileInput') fileInput: FileUpload;

    _hasError = false;

    @Input()
    acceptedTypes = 'media_type';

    @Input()
    required = true;


    @Output()
    onFilesSelected: EventEmitter<any> = new EventEmitter();

    @Output()
    onFileRemoved: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }


    onSelect() {
        this._hasError = false;
        this.onFilesSelected.emit(this.fileInput.files);
    }

    onRemove() {
        this._hasError = false;
        this.onFileRemoved.emit(this.fileInput.files);
    }

    get hasError() {
        return this._hasError;
    }

    @Input()
    set hasError(hasError) {
        this._hasError = hasError;
    }


}

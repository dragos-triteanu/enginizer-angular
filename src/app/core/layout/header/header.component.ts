import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

    @ViewChild('languageDropdown') languageDropdown;

    @Input()
    userName: string;
    @Input()
    currentLanguage: string;

    @Input()
    languages = [];

    @Input()
    hasSidebar: boolean;

    @Output('logoutFired')
    logoutFired: EventEmitter<any> = new EventEmitter();

    @Output() languageChange: EventEmitter<any> = new EventEmitter();

    private $languageDropdown;

    ngAfterViewInit(): void {
        this.$languageDropdown = $(this.languageDropdown.nativeElement).dropdown();
    }

    logout() {
        this.logoutFired.emit();
    }

    translate(language) {
        this.languageChange.emit(language);
    }
}

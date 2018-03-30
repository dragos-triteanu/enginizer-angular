import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

declare let $: any;

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

    @Input() user;

    @Output() logout = new EventEmitter<any>();

    languageKey = 'user-language';

    constructor(private translationService: TranslateService) {
    }

    ngOnInit() {
        // Navigation Toggle
        $('.button-collapse').sideNav({
            closeOnClick: true
        });

        // User Menu Toggle
        $('.dropdown-button').dropdown();
    }

    onLogout() {
        this.logout.emit();
    }

    translate(language) {
        this.translationService.use(language);
        localStorage.setItem(this.languageKey, language);
    }
}
